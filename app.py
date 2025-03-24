from flask import Flask, render_template, request, jsonify
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import concurrent.futures

app = Flask(__name__)

def is_valid_url(url):
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except:
        return False

def check_link(url, base_url):
    try:
        if not is_valid_url(url):
            url = urljoin(base_url, url)
        
        response = requests.head(url, timeout=5)
        return {
            'url': url,
            'status': response.status_code,
            'is_broken': response.status_code >= 400
        }
    except:
        return {
            'url': url,
            'status': 0,
            'is_broken': True
        }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check', methods=['POST'])
def check_links():
    url = request.json.get('url')
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        links = [a.get('href') for a in soup.find_all('a', href=True)]
        
        results = []
        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
            future_to_url = {executor.submit(check_link, link, url): link for link in links}
            for future in concurrent.futures.as_completed(future_to_url):
                result = future.result()
                if result['is_broken']:
                    results.append(result)

        return jsonify({
            'total_links': len(links),
            'broken_links': results
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 