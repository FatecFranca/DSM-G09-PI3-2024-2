import React from 'react';
import './styleboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Menu Lateral */}
      <aside className="sidebar">
        <div className="menu-icon">☰</div>
        <nav>
        <ul class="menu-list">
          <li class="menu-item receita">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13" cy="13" r="13" fill="#12A454"/>
          <path d="M11.0126 20.3876H16.2626M11.0126 17.7626H16.2626M11.0126 12.5126H7.87481C7.70178 12.5125 7.53265 12.4612 7.38879 12.365C7.24493 12.2689 7.13281 12.1322 7.0666 11.9724C7.00038 11.8125 6.98306 11.6366 7.0168 11.4669C7.05055 11.2972 7.13386 11.1413 7.25619 11.0189L13.0189 5.25619C13.183 5.09215 13.4055 5 13.6376 5C13.8696 5 14.0921 5.09215 14.2562 5.25619L20.0189 11.0189C20.1413 11.1413 20.2246 11.2972 20.2583 11.4669C20.2921 11.6366 20.2747 11.8125 20.2085 11.9724C20.1423 12.1322 20.0302 12.2689 19.8863 12.365C19.7425 12.4612 19.5733 12.5125 19.4003 12.5126H16.2626V15.1376H11.0126V12.5126Z" stroke="#ECF3FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>Receita</li>
          <li class="menu-item despesa">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13" cy="13" r="13" fill="#E83F5B"/>
          <path d="M11.0126 5.61244H16.2626M11.0126 8.23744H16.2626M11.0126 13.4874H7.87481C7.70178 13.4875 7.53265 13.5388 7.38879 13.635C7.24493 13.7311 7.13281 13.8678 7.0666 14.0276C7.00038 14.1875 6.98306 14.3634 7.0168 14.5331C7.05055 14.7028 7.13386 14.8587 7.25619 14.9811L13.0189 20.7438C13.183 20.9078 13.4055 21 13.6376 21C13.8696 21 14.0921 20.9078 14.2562 20.7438L20.0189 14.9811C20.1413 14.8587 20.2246 14.7028 20.2583 14.5331C20.2921 14.3634 20.2747 14.1875 20.2085 14.0276C20.1423 13.8678 20.0302 13.7311 19.8863 13.635C19.7425 13.5388 19.5733 13.4875 19.4003 13.4874H16.2626V10.8624H11.0126V13.4874Z" stroke="#ECF3FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>Despesa</li>
          <li class="menu-item grupos">
          <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_145_475)">
          <rect x="4" width="26" height="26" rx="13" fill="#274156"/>
          <path d="M10 17.6667V16.048C10 15.7174 10.0826 15.4112 10.2479 15.1292C10.4132 14.8473 10.6417 14.6334 10.9333 14.4875C11.0694 14.4195 11.2007 14.3563 11.3271 14.298C11.4632 14.2396 11.6042 14.1862 11.75 14.1375V17.6667H10ZM12.3333 13.5834C11.8472 13.5834 11.434 13.4132 11.0938 13.073C10.7535 12.7327 10.5833 12.3195 10.5833 11.8334C10.5833 11.3473 10.7535 10.9341 11.0938 10.5938C11.434 10.2535 11.8472 10.0834 12.3333 10.0834C12.8194 10.0834 13.2326 10.2535 13.5729 10.5938C13.9132 10.9341 14.0833 11.3473 14.0833 11.8334C14.0833 12.3195 13.9132 12.7327 13.5729 13.073C13.2326 13.4132 12.8194 13.5834 12.3333 13.5834ZM12.3333 12.4167C12.4986 12.4167 12.6347 12.3632 12.7417 12.2563C12.8583 12.1396 12.9167 11.9987 12.9167 11.8334C12.9167 11.6681 12.8583 11.532 12.7417 11.425C12.6347 11.3084 12.4986 11.25 12.3333 11.25C12.1681 11.25 12.0271 11.3084 11.9104 11.425C11.8035 11.532 11.75 11.6681 11.75 11.8334C11.75 11.9987 11.8035 12.1396 11.9104 12.2563C12.0271 12.3632 12.1681 12.4167 12.3333 12.4167ZM12.3333 17.6667V16.0334C12.3333 15.7028 12.416 15.4014 12.5812 15.1292C12.7563 14.8473 12.9847 14.6334 13.2667 14.4875C13.8694 14.1862 14.4819 13.9625 15.1042 13.8167C15.7264 13.6612 16.3583 13.5834 17 13.5834C17.6417 13.5834 18.2736 13.6612 18.8958 13.8167C19.5181 13.9625 20.1306 14.1862 20.7333 14.4875C21.0153 14.6334 21.2389 14.8473 21.4042 15.1292C21.5792 15.4014 21.6667 15.7028 21.6667 16.0334V17.6667H12.3333ZM13.5 16.5H20.5V16.0334C20.5 15.9264 20.4708 15.8292 20.4125 15.7417C20.3639 15.6542 20.2958 15.5862 20.2083 15.5375C19.6833 15.275 19.1535 15.0806 18.6187 14.9542C18.084 14.8181 17.5444 14.75 17 14.75C16.4556 14.75 15.916 14.8181 15.3812 14.9542C14.8465 15.0806 14.3167 15.275 13.7917 15.5375C13.7042 15.5862 13.6312 15.6542 13.5729 15.7417C13.5243 15.8292 13.5 15.9264 13.5 16.0334V16.5ZM17 13C16.3583 13 15.809 12.7716 15.3521 12.3146C14.8951 11.8577 14.6667 11.3084 14.6667 10.6667C14.6667 10.025 14.8951 9.47574 15.3521 9.01879C15.809 8.56185 16.3583 8.33337 17 8.33337C17.6417 8.33337 18.191 8.56185 18.6479 9.01879C19.1049 9.47574 19.3333 10.025 19.3333 10.6667C19.3333 11.3084 19.1049 11.8577 18.6479 12.3146C18.191 12.7716 17.6417 13 17 13ZM17 11.8334C17.3208 11.8334 17.5931 11.7216 17.8167 11.498C18.05 11.2646 18.1667 10.9875 18.1667 10.6667C18.1667 10.3459 18.05 10.0737 17.8167 9.85004C17.5931 9.61671 17.3208 9.50004 17 9.50004C16.6792 9.50004 16.4021 9.61671 16.1688 9.85004C15.9451 10.0737 15.8333 10.3459 15.8333 10.6667C15.8333 10.9875 15.9451 11.2646 16.1688 11.498C16.4021 11.7216 16.6792 11.8334 17 11.8334ZM21.6667 13.5834C21.1806 13.5834 20.7674 13.4132 20.4271 13.073C20.0868 12.7327 19.9167 12.3195 19.9167 11.8334C19.9167 11.3473 20.0868 10.9341 20.4271 10.5938C20.7674 10.2535 21.1806 10.0834 21.6667 10.0834C22.1528 10.0834 22.566 10.2535 22.9063 10.5938C23.2465 10.9341 23.4167 11.3473 23.4167 11.8334C23.4167 12.3195 23.2465 12.7327 22.9063 13.073C22.566 13.4132 22.1528 13.5834 21.6667 13.5834ZM21.6667 12.4167C21.8319 12.4167 21.9681 12.3632 22.075 12.2563C22.1917 12.1396 22.25 11.9987 22.25 11.8334C22.25 11.6681 22.1917 11.532 22.075 11.425C21.9681 11.3084 21.8319 11.25 21.6667 11.25C21.5014 11.25 21.3604 11.3084 21.2438 11.425C21.1368 11.532 21.0833 11.6681 21.0833 11.8334C21.0833 11.9987 21.1368 12.1396 21.2438 12.2563C21.3604 12.3632 21.5014 12.4167 21.6667 12.4167ZM22.25 17.6667V14.1375C22.3958 14.1862 22.5319 14.2396 22.6583 14.298C22.7944 14.3563 22.9306 14.4195 23.0667 14.4875C23.3583 14.6334 23.5868 14.8473 23.7521 15.1292C23.9174 15.4112 24 15.7174 24 16.048V17.6667H22.25Z" fill="#ECF3FB"/>
          </g>
          <defs>
          <filter id="filter0_d_145_475" x="0" y="0" width="34" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="5"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_145_475"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_145_475" result="shape"/>
          </filter>
          </defs>
          </svg>Grupos</li>
          <li class="menu-item fechar">
          <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_145_478)">
          <rect x="4" width="26" height="26" rx="13" fill="#274156"/>
          <path d="M14.3862 8.09353C14.2147 7.92211 13.9822 7.8258 13.7398 7.8258C13.4974 7.8258 13.2649 7.92211 13.0935 8.09353C12.9221 8.26495 12.8258 8.49744 12.8258 8.73987C12.8258 8.98229 12.9221 9.21479 13.0935 9.38621L15.8943 12.187L13.0935 14.9878C12.9221 15.1592 12.8258 15.3917 12.8258 15.6342C12.8258 15.8766 12.9221 16.1091 13.0935 16.2805C13.2649 16.4519 13.4974 16.5482 13.7398 16.5482C13.9822 16.5482 14.2147 16.4519 14.3862 16.2805L17.187 13.4797L19.9878 16.2805C20.1592 16.4519 20.3917 16.5482 20.6341 16.5482C20.8765 16.5482 21.109 16.4519 21.2805 16.2805C21.4519 16.1091 21.5482 15.8766 21.5482 15.6342C21.5482 15.3917 21.4519 15.1592 21.2805 14.9878L18.4796 12.187L21.2805 9.38621C21.4519 9.21479 21.5482 8.98229 21.5482 8.73987C21.5482 8.49744 21.4519 8.26495 21.2805 8.09353C21.109 7.92211 20.8765 7.8258 20.6341 7.8258C20.3917 7.8258 20.1592 7.92211 19.9878 8.09353L17.187 10.8943L14.3862 8.09353Z" fill="#ECF3FB"/>
          </g>
          <defs>
          <filter id="filter0_d_145_478" x="0" y="0" width="34" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="5"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_145_478"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_145_478" result="shape"/>
          </filter>
          </defs>
          </svg>Fechar</li>
        </ul>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="content">
        {/* Área Principal */}
        <div className="main-content">
          <header className="header">
            <div className="profile">
              <h2>Caio Rian</h2>
            </div>
            <div className="header-icons">
              <i className="fas fa-eye"></i>
              <i className="fas fa-cog"></i>
            </div>
          </header>

          {/* Saldo */}
          <div className="balance">
            <div className="balance-info">
              <h3>Saldo atual</h3>
              <span>R$ 204,00</span>
            </div>
            <div className="balance-info">
              <h3>Saldo previsto</h3>
              <span>R$ 124,00</span>
            </div>
          </div>

          {/* Cartões de Despesas e Receitas */}
          <div className="cards">
            <div className="card red">
              <h4>Despesas</h4>
              <span className="amount red">R$ 543,50</span>
              <ul>
                <li>Mercado: R$ 32,00</li>
                <li>Luz: R$ 80,00</li>
                <li>Aluguel: R$ 105,50</li>
              </ul>
            </div>
            <div className="card green">
              <h4>Receitas</h4>
              <span className="amount green">R$ 1020,50</span>
              <ul>
                <li>Salário: R$ 750,00</li>
                <li>Freelance: R$ 270,50</li>
              </ul>
            </div>
          </div>

          {/* Planejamento */}
          <div className="planning">
            <h4>Planejamento</h4>
            <div className="bar-container">
              <div className="bar">
                <span>Educação</span>
                <div className="progress red" style={{ width: '85%' }}></div>
              </div>
              <div className="bar">
                <span>Lazer</span>
                <div className="progress orange" style={{ width: '70%' }}></div>
              </div>
              <div className="bar">
                <span>Alimentação</span>
                <div className="progress blue" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards de Notícias à direita */}
        <div className="news-cards-container">
          <div className="news-card">
            <img src="news1.jpg" alt="Notícia" />
            <div className="news-card-content">
              <h5>Notícia financeira exemplo</h5>
              <p>Craig Bator - 27 Dec 2020</p>
            </div>
          </div>
          <div className="news-card">
            <img src="news2.jpg" alt="Notícia" />
            <div className="news-card-content">
              <h5>Notícia financeira exemplo</h5>
              <p>Craig Bator - 27 Dec 2020</p>
            </div>
          </div>
          {/* Adicione mais cards conforme necessário */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
