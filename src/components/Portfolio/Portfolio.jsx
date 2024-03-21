// * react
import React from 'react';

// ? стили
import './Portfolio.css';

function Portfolio() {
  return (
    <article className='portfolio'>
      <h3 className='portfolio__title'>Portfolio</h3>

      <ul className='portfolio__list-web-sites'>
        {/* ReddNotes */}
        <li>
          <a
            href='https://reddnotes.netlify.app'
            target='_blank'
            rel='noreferrer'
            className='portfolio__web-site link'
          >
            <div className='portfolio__web-site-first-part'>
              <h4 className='portfolio__web-site-name'>ReddNotes</h4>

              <img
                className='portfolio__web-site-logo'
                alt='logotype of ReddNotes'
                src='https://reddnotes.netlify.app/assets/ReddNotes_logo_fire-CWXB925t.svg'
              />
            </div>

            <span className='portfolio__web-site-arrow'>↗</span>
          </a>
        </li>

        {/* mesto */}
        <li>
          <a
            href='https://github.com/chyVacheck/react-mesto-api-full-gha'
            target='_blank'
            rel='noreferrer'
            className='portfolio__web-site link'
          >
            <h4 className='portfolio__web-site-name'>Mesto</h4>

            <span className='portfolio__web-site-arrow'>↗</span>
          </a>
        </li>

        {/* space miner */}
        <li>
          <a
            href='https://chyvacheck.github.io/space_miner/#how-to-play'
            target='_blank'
            rel='noreferrer'
            className='portfolio__web-site link'
          >
            <div className='portfolio__web-site-first-part'>
              <h4 className='portfolio__web-site-name'>Space miner</h4>
              <img
                className='portfolio__web-site-logo'
                alt='logotype of Space miner'
                src='https://chyvacheck.github.io/space_miner/assets/icon/space-suit.svg'
              />
            </div>

            <span className='portfolio__web-site-arrow'>↗</span>
          </a>
        </li>

        {/* travel */}
        <li>
          <a
            href='https://chyvacheck.github.io/travel/'
            target='_blank'
            rel='noreferrer'
            className='portfolio__web-site link'
          >
            <h4 className='portfolio__web-site-name'>Travel in Ukraine</h4>

            <span className='portfolio__web-site-arrow'>↗</span>
          </a>
        </li>

        {/* how to learn */}
        <li>
          <a
            href='https://github.com/chyVacheck/how-to-learn'
            target='_blank'
            rel='noreferrer'
            className='portfolio__web-site link'
          >
            <h4 className='portfolio__web-site-name'>How to learn</h4>

            <span className='portfolio__web-site-arrow'>↗</span>
          </a>
        </li>
      </ul>
    </article>
  );
}

export default Portfolio;
