import React from 'react'
import './meta-mask.css'
import iconMetaMask from 'images/meta-mask.svg'

export default class MetaMask extends React.Component {
  render () {
    const { msg } = this.props
    return (
      <main>
        <section id='intro' className='container'>
          <div id='logo-container'>
            <img width='200px' height='200px' src={iconMetaMask} />
            <h1>MetaMask</h1>

            {msg === 'login'
              ? <>
                <h2>Login to app</h2>
                <button
                  type='button'
                  className='btn btn-login'
                  onClick={this.props.postLogin}
                >
                  Login
                </button>
                <p className='text-des'>Login to app using account from metamask</p>
              </>
              : <>
                <h2>This site requires the Metamask plugin</h2>
                <a href='https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn' id='main-install-button' className='cta' target='_blank'>Get Chrome Extension</a>
                <p>
                  <a href='https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn' className='download-link download-link-chrome' target='_blank'>Chrome </a>
                  <a href='https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/' className='download-link download-link-firefox' target='_blank'>Firefox</a>
                  <a href='https://addons.opera.com/en/extensions/details/metamask/' className='download-link download-link-opera' target='_blank'>Opera</a>
                </p>
                <p>OR</p>
                <a href='https://brave.com/' className='cta' target='_blank'>Get Brave Browser</a>
            </>
            }
          </div>
        </section>
      </main>
    )
  }
}
