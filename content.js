// Content script to inject widget only on Stripe checkout pages with "Try Cursor Pro"
function checkAndCreateWidget() {
    // Check if we're on Stripe checkout
    if (!window.location.href.includes('checkout.stripe.com')) {
        return;
    }
    
    // Check if page contains "Try Cursor Pro"
    if (!document.body.textContent.includes('Try Cursor Pro')) {
        return;
    }
    
    console.log('Stripe checkout page with "Try Cursor Pro" detected!');
    
    const widget = document.createElement('div');
    widget.id = 'card-generator-widget';
    widget.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background: white;
        border: 1px solid #e1e5e9;
        border-radius: 8px;
        padding: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    `;
    
    widget.innerHTML = `
        <button id="fill-card" style="display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: #2196F3; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500;">
            <span>💳</span>
            <span>Generate Card</span>
        </button>
        <button id="fill-address" style="display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: #4CAF50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500;">
            <span>🏠</span>
            <span>Generate Address</span>
        </button>
    `;
    
    document.body.appendChild(widget);
    
    document.getElementById('fill-address').onclick = async () => {
        const button = document.getElementById('fill-address');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<span>⏳</span><span>Loading...</span>';
        button.disabled = true;
        
        try {
            const proxyUrl = 'https://api.allorigins.win/get?url=';
            const targetUrl = `https://www.bestrandoms.com/random-address-in-ma?quantity=10&t=${Date.now()}`;
            const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
            const data = await response.json();
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');
            const contentDiv = doc.querySelector('.content');
            
            if (!contentDiv) {
                console.log('No content found');
                button.innerHTML = originalText;
                button.disabled = false;
                return;
            }
            
            const addresses = [];
            const liElements = contentDiv.querySelectorAll('li.col-sm-6');
            
            liElements.forEach(li => {
                const addressData = {};
                const spans = li.querySelectorAll('span');
                
                spans.forEach(span => {
                    const text = span.textContent.trim();
                    if (text.startsWith('Street:')) {
                        addressData.street = text.replace('Street:', '').trim();
                    } else if (text.startsWith('State/province/area:')) {
                        addressData.state = text.replace('State/province/area:', '').trim();
                    } else if (text.startsWith('Zip code:')) {
                        addressData.zip_code = text.replace('Zip code:', '').trim();
                    }
                });
                
                if (Object.keys(addressData).length > 0) {
                    addresses.push(addressData);
                }
            });
            
            if (addresses.length > 0) {
                const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
                const randomName = generateMoroccanName();
                
                fillAddressFields(randomName, randomAddress);
                console.log('Address filled:', { name: randomName, address: randomAddress });
            } else {
                console.log('No addresses parsed');
            }
            
        } catch (error) {
            console.error('Error fetching addresses:', error);
        } finally {
            button.innerHTML = originalText;
            button.disabled = false;
        }
    };
    
    
    function fillAddressFields(name, address) {
        const cardholderName = document.getElementById('billingName');
        const addressLine1 = document.getElementById('billingAddressLine1');
        const postalCode = document.getElementById('billingPostalCode');
        const city = document.getElementById('billingLocality');
        
        // Simulate human-like input to avoid auto-clear detection
        setTimeout(() => {
            if (cardholderName) {
                cardholderName.focus();
                cardholderName.value = name;
                cardholderName.dispatchEvent(new Event('input', { bubbles: true }));
                cardholderName.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, 100);
        
        setTimeout(() => {
            if (addressLine1) {
                addressLine1.focus();
                addressLine1.value = address.street;
                addressLine1.dispatchEvent(new Event('input', { bubbles: true }));
                addressLine1.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, 200);
        
        setTimeout(() => {
            if (postalCode) {
                postalCode.focus();
                postalCode.value = address.zip_code;
                postalCode.dispatchEvent(new Event('input', { bubbles: true }));
                postalCode.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, 300);
        
        setTimeout(() => {
            if (city) {
                city.focus();
                city.value = address.state;
                city.dispatchEvent(new Event('input', { bubbles: true }));
                city.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, 400);
    }
    
    document.getElementById('fill-card').onclick = () => {
        const button = document.getElementById('fill-card');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<span>⏳</span><span>Generating...</span>';
        button.disabled = true;
        setTimeout(() => {
            try {
                const cards = generateCards(10);
                const randomCard = cards[Math.floor(Math.random() * cards.length)];
                fillCardFields(randomCard);
                console.log('Card filled:', randomCard);
            } finally {
                button.innerHTML = originalText;
                button.disabled = false;
            }
        }, 500);
    };
    
    function fillCardFields(card) {
        const cardNumber = document.getElementById('cardNumber');
        const cardExpiry = document.getElementById('cardExpiry');
        const cardCvc = document.getElementById('cardCvc');
        
        // Simulate human-like input to avoid auto-clear detection
        setTimeout(() => {
            if (cardNumber) {
                cardNumber.focus();
                cardNumber.value = card.number;
                cardNumber.dispatchEvent(new Event('input', { bubbles: true }));
                cardNumber.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, 100);
        
        setTimeout(() => {
            if (cardExpiry) {
                cardExpiry.focus();
                cardExpiry.value = `${card.month}/${card.year.slice(-2)}`;
                cardExpiry.dispatchEvent(new Event('input', { bubbles: true }));
                cardExpiry.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, 200);
        
        setTimeout(() => {
            if (cardCvc) {
                cardCvc.focus();
                cardCvc.value = card.cvv;
                cardCvc.dispatchEvent(new Event('input', { bubbles: true }));
                cardCvc.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, 300);
    }
}

// Check when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndCreateWidget);
} else {
    checkAndCreateWidget();
}

// Also check when page content changes (for dynamic content)
const observer = new MutationObserver(() => {
    if (!document.getElementById('card-generator-widget')) {
        checkAndCreateWidget();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});