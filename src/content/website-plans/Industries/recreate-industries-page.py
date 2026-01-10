#!/usr/bin/env python3
"""
Industries page - polished minimalist tech design with robust styling.
"""

import json
import urllib.request
import base64

SITE_URL = "https://databender.co"
USERNAME = "grant"
APP_PASSWORD = "lnNa 4sE9 XUz8 S40P eUJr Usbr"
PAGE_ID = 16989

auth = base64.b64encode(f"{USERNAME}:{APP_PASSWORD}".encode()).decode()

def make_request(endpoint, payload=None, method='GET'):
    url = f"{SITE_URL}/wp-json/wp/v2/{endpoint}"
    if payload:
        data = json.dumps(payload).encode()
        req = urllib.request.Request(url, data, method=method)
        req.add_header('Content-Type', 'application/json')
    else:
        req = urllib.request.Request(url, method=method)
    req.add_header('Authorization', f'Basic {auth}')
    try:
        response = urllib.request.urlopen(req)
        return json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.read().decode()}")
        return None

html_content = '''
<style>
/* Reset and base - use !important to override theme */
.ind-page * { box-sizing: border-box; }
.ind-page { margin: 0 -15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
.ind-page h1, .ind-page h2, .ind-page h3, .ind-page h4 { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; }
.ind-page p { margin: 0; padding: 0; }
.ind-page a { text-decoration: none; }
.ind-page ul { list-style: none; margin: 0; padding: 0; }

/* Hero */
.ind-hero {
    background: #0F172A !important;
    padding: 100px 24px 80px !important;
    text-align: center !important;
}
.hero-inner {
    max-width: 720px;
    margin: 0 auto;
}
.hero-badge {
    display: inline-block;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 12px !important;
    font-weight: 500 !important;
    letter-spacing: 0.5px;
    color: #1A9988 !important;
    background: rgba(26, 153, 136, 0.12) !important;
    border: 1px solid rgba(26, 153, 136, 0.25) !important;
    padding: 8px 16px !important;
    border-radius: 4px !important;
    margin-bottom: 28px !important;
}
.hero-headline {
    color: #FFFFFF !important;
    font-size: 48px !important;
    font-weight: 600 !important;
    line-height: 1.15 !important;
    letter-spacing: -0.025em !important;
    margin: 0 0 20px 0 !important;
}
.hero-sub {
    color: #94A3B8 !important;
    font-size: 18px !important;
    line-height: 1.7 !important;
    margin: 0 0 36px 0 !important;
}
.hero-sub strong {
    color: #CBD5E1 !important;
    font-weight: 500 !important;
}
.hero-btn {
    display: inline-block !important;
    background: #1A9988 !important;
    color: #FFFFFF !important;
    font-size: 15px !important;
    font-weight: 500 !important;
    padding: 14px 28px !important;
    border-radius: 6px !important;
    transition: background 0.2s ease !important;
}
.hero-btn:hover {
    background: #22B8A4 !important;
    color: #FFFFFF !important;
}

/* Section container */
.ind-section {
    max-width: 1100px;
    margin: 0 auto;
    padding: 80px 24px;
}
.section-head {
    text-align: center;
    max-width: 640px;
    margin: 0 auto 56px;
}
.section-head h2 {
    color: #0F172A !important;
    font-size: 32px !important;
    font-weight: 600 !important;
    letter-spacing: -0.02em !important;
    margin: 0 0 12px 0 !important;
}
.section-head p {
    color: #64748B !important;
    font-size: 17px !important;
    line-height: 1.65 !important;
}

/* Cross-pollination */
.cross-wrap {
    background: #F8FAFC !important;
    border-top: 1px solid #E2E8F0 !important;
    border-bottom: 1px solid #E2E8F0 !important;
}
.cross-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: #E2E8F0;
    border-radius: 8px;
    overflow: hidden;
    max-width: 1000px;
    margin: 0 auto;
}
@media (max-width: 800px) { .cross-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 500px) { .cross-grid { grid-template-columns: 1fr; } }
.cross-item {
    background: #FFFFFF !important;
    padding: 28px 20px !important;
    text-align: center !important;
}
.cross-item svg {
    width: 32px;
    height: 32px;
    color: #1A9988;
    margin-bottom: 12px;
}
.cross-item h4 {
    color: #0F172A !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    margin: 0 0 8px 0 !important;
}
.cross-item p {
    color: #64748B !important;
    font-size: 13px !important;
    line-height: 1.6 !important;
}

/* Industry cards */
.cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}
@media (max-width: 700px) { .cards-grid { grid-template-columns: 1fr; } }

.ind-card {
    background: #FFFFFF !important;
    border: 1px solid #E2E8F0 !important;
    border-radius: 12px !important;
    padding: 32px !important;
    transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
}
.ind-card:hover {
    border-color: #CBD5E1 !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
}
.card-top {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 20px;
}
.card-ico {
    width: 44px;
    height: 44px;
    background: #F1F5F9 !important;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.card-ico svg {
    width: 22px;
    height: 22px;
    color: #475569;
}
.card-info h3 {
    color: #0F172A !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    margin: 0 0 2px 0 !important;
}
.card-info span {
    color: #64748B !important;
    font-size: 14px !important;
}
.card-list {
    margin: 0 0 24px 0 !important;
    padding: 0 !important;
}
.card-list li {
    color: #475569 !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    padding: 6px 0 !important;
    padding-left: 18px !important;
    position: relative;
}
.card-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 12px;
    width: 5px;
    height: 5px;
    background: #1A9988 !important;
    border-radius: 50%;
}
.card-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #1A9988 !important;
    font-size: 14px !important;
    font-weight: 500 !important;
}
.card-link:hover {
    color: #22B8A4 !important;
}
.card-link svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
}
.card-link:hover svg {
    transform: translateX(3px);
}

/* Other industries */
.other-wrap {
    background: #F8FAFC !important;
    border-top: 1px solid #E2E8F0 !important;
    text-align: center;
}
.other-wrap h2 {
    color: #0F172A !important;
    font-size: 26px !important;
    font-weight: 600 !important;
    margin: 0 0 12px 0 !important;
}
.other-wrap > p {
    color: #64748B !important;
    font-size: 16px !important;
    line-height: 1.65 !important;
    max-width: 520px;
    margin: 0 auto 28px !important;
}
.tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-bottom: 32px;
}
.tag {
    background: #FFFFFF !important;
    border: 1px solid #E2E8F0 !important;
    color: #475569 !important;
    font-size: 13px !important;
    padding: 7px 14px !important;
    border-radius: 6px !important;
}
.ghost-btn {
    display: inline-block !important;
    background: transparent !important;
    border: 1px solid #CBD5E1 !important;
    color: #475569 !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    padding: 12px 24px !important;
    border-radius: 6px !important;
    transition: all 0.2s ease !important;
}
.ghost-btn:hover {
    border-color: #94A3B8 !important;
    color: #334155 !important;
}

/* CTA */
.cta-wrap {
    background: #0F172A !important;
    text-align: center;
    padding: 80px 24px !important;
}
.cta-inner {
    max-width: 560px;
    margin: 0 auto;
}
.cta-wrap h2 {
    color: #FFFFFF !important;
    font-size: 28px !important;
    font-weight: 600 !important;
    margin: 0 0 12px 0 !important;
}
.cta-wrap p {
    color: #94A3B8 !important;
    font-size: 16px !important;
    line-height: 1.65 !important;
    margin: 0 0 32px 0 !important;
}
.cta-btns {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
}
.pri-btn {
    display: inline-block !important;
    background: #1A9988 !important;
    color: #FFFFFF !important;
    font-size: 15px !important;
    font-weight: 500 !important;
    padding: 13px 26px !important;
    border-radius: 6px !important;
}
.pri-btn:hover {
    background: #22B8A4 !important;
    color: #FFFFFF !important;
}
.sec-btn {
    display: inline-block !important;
    background: transparent !important;
    border: 1px solid #475569 !important;
    color: #CBD5E1 !important;
    font-size: 15px !important;
    font-weight: 500 !important;
    padding: 12px 25px !important;
    border-radius: 6px !important;
}
.sec-btn:hover {
    border-color: #64748B !important;
    color: #FFFFFF !important;
}
</style>

<div class="ind-page">

<!-- Hero -->
<div class="ind-hero">
    <div class="hero-inner">
        <div class="hero-badge">Industry Expertise</div>
        <h1 class="hero-headline">Cross-industry insight.<br>Right-sized solutions.</h1>
        <p class="hero-sub">We've solved data challenges across <strong>healthcare, legal, real estate, and manufacturing</strong>. That breadth means we bring proven patterns to your specific situation.</p>
        <a href="#industries" class="hero-btn">Explore industries</a>
    </div>
</div>

<!-- Cross-pollination -->
<div class="cross-wrap">
    <div class="ind-section">
        <div class="section-head">
            <h2>Best practices that travel</h2>
            <p>Working across industries gives us perspective. You benefit from approaches proven elsewhere.</p>
        </div>
        <div class="cross-grid">
            <div class="cross-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                <h4>Healthcare</h4>
                <p>Compliance rigor<br>Data governance<br>Patient-centric design</p>
            </div>
            <div class="cross-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
                <h4>Professional Services</h4>
                <p>Knowledge management<br>Utilization tracking<br>Client intelligence</p>
            </div>
            <div class="cross-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                <h4>Real Estate</h4>
                <p>Portfolio thinking<br>Multi-location visibility<br>Investor-grade reporting</p>
            </div>
            <div class="cross-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <h4>Manufacturing</h4>
                <p>Operational visibility<br>Production metrics<br>Efficiency focus</p>
            </div>
        </div>
    </div>
</div>

<!-- Industry Cards -->
<div class="ind-section" id="industries">
    <div class="section-head">
        <h2>Choose your industry</h2>
        <p>Each industry has unique data challenges. Select yours to see how we approach them.</p>
    </div>

    <div class="cards-grid">
        <div class="ind-card">
            <div class="card-top">
                <div class="card-ico">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
                </div>
                <div class="card-info">
                    <h3>Professional Services</h3>
                    <span>Law firms and consultancies</span>
                </div>
            </div>
            <ul class="card-list">
                <li>Find firm knowledge across documents and matters</li>
                <li>Preserve institutional memory when people leave</li>
                <li>Track utilization and profitability by matter</li>
                <li>Surface cross-sell opportunities in client data</li>
            </ul>
            <a href="/industries/professional-services/" class="card-link">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
        </div>

        <div class="ind-card">
            <div class="card-top">
                <div class="card-ico">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                </div>
                <div class="card-info">
                    <h3>Healthcare & Dental</h3>
                    <span>Practices and DSOs</span>
                </div>
            </div>
            <ul class="card-list">
                <li>Gain visibility across multiple locations</li>
                <li>Analyze per-location profitability</li>
                <li>Optimize revenue cycle and payer mix</li>
                <li>Build HIPAA-compliant data infrastructure</li>
            </ul>
            <a href="/industries/healthcare-dental/" class="card-link">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
        </div>

        <div class="ind-card">
            <div class="card-top">
                <div class="card-ico">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                </div>
                <div class="card-info">
                    <h3>Commercial Real Estate</h3>
                    <span>Property managers and investors</span>
                </div>
            </div>
            <ul class="card-list">
                <li>Unify data across properties and systems</li>
                <li>Track lease renewals and tenant intelligence</li>
                <li>Build portfolio-wide performance analytics</li>
                <li>Generate investor reports in minutes, not days</li>
            </ul>
            <a href="/industries/commercial-real-estate/" class="card-link">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
        </div>

        <div class="ind-card">
            <div class="card-top">
                <div class="card-ico">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div class="card-info">
                    <h3>Manufacturing</h3>
                    <span>Scale-up manufacturers</span>
                </div>
            </div>
            <ul class="card-list">
                <li>Connect CRM, ERP, and inventory systems</li>
                <li>Build production visibility and traceability</li>
                <li>Create trusted reports that save hours weekly</li>
                <li>Prepare PE-ready metrics and dashboards</li>
            </ul>
            <a href="/industries/manufacturing/" class="card-link">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
        </div>
    </div>
</div>

<!-- Other industries -->
<div class="other-wrap">
    <div class="ind-section">
        <h2>Don't see your industry?</h2>
        <p>Our core capabilities—data integration, analytics, and AI—apply across industries. If you're dealing with scattered data or want to use AI effectively, we can help.</p>
        <div class="tags">
            <span class="tag">Financial Services</span>
            <span class="tag">Non-Profit</span>
            <span class="tag">Education</span>
            <span class="tag">Retail & E-commerce</span>
            <span class="tag">Logistics</span>
        </div>
        <a href="/contact/" class="ghost-btn">Let's discuss your situation</a>
    </div>
</div>

<!-- CTA -->
<div class="cta-wrap">
    <div class="cta-inner">
        <h2>Not sure where to start?</h2>
        <p>Take a quick assessment to identify your data challenges, or schedule a conversation with someone who understands your industry.</p>
        <div class="cta-btns">
            <a href="/assessments/" class="pri-btn">Take assessment</a>
            <a href="/contact/" class="sec-btn">Schedule a call</a>
        </div>
    </div>
</div>

</div>
'''

# Delete and recreate
print("Deleting current Industries page...")
delete_result = make_request(f"pages/{PAGE_ID}?force=true", method='DELETE')
if delete_result:
    print(f"  Deleted: {delete_result.get('id')}")

print("\nCreating polished Industries page...")
new_page = {
    "title": "Industries",
    "slug": "industries",
    "content": html_content,
    "status": "publish",
    "parent": 0,
    "menu_order": 0
}

result = make_request("pages", new_page, method='POST')
if result:
    print(f"  Created: ID {result.get('id')}")
    print(f"  URL: {result.get('link')}")
    print("\nDone. View at https://databender.co/industries/")
else:
    print("  Failed to create page")
