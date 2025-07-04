import React from "react"
import { GiClapperboard } from "react-icons/gi"
import "./TermsPage.css"

export default function TermsPage() {
  return (
    <div className="terms-container">
      <div className="terms-background"></div>

      <header className="terms-header">
        <div className="header-content">
          <div className="brand-section">
            <div className="brand-logo">
              <GiClapperboard className="logo-icon" />
            </div>
            <h1 className="brand-title">TMDB - Tropa Movie Database</h1>
          </div>

          <div className="header-actions">
            <a href="/search" className="nav-button">
              <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar
            </a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="page-header">
          <h2 className="page-title">
            <svg className="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Termos de Uso
          </h2>
          <p className="page-subtitle">Regras e diretrizes da Tropa Movie Database</p>
        </div>

        <section className="terms-section">
          <div className="terms-card">
            <div className="terms-card-header">
              <h3 className="terms-card-title">
                <svg className="terms-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Regras da Tropa
              </h3>
            </div>

            <div className="terms-list">
              <div className="term-item">
                <div className="term-number">1</div>
                <div className="term-content">
                  <p>
                    Se assistiu com a tropa, a nota é pela pira tirada com a tropa. Se assistiu sozinho, avaliar todos
                    os aspectos do filme.
                  </p>
                </div>
              </div>

              <div className="term-item">
                <div className="term-number">2</div>
                <div className="term-content">
                  <p>Votar somente nos filmes que assistiu.</p>
                </div>
              </div>

              <div className="term-item">
                <div className="term-number">3</div>
                <div className="term-content">
                  <p>
                    Para ter acesso a lista faz-se necessária uma fidelidade de pelo menos 5 filmes no currículo. O
                    conselho supremo irá decidir se você fará parte da lista.
                  </p>
                </div>
              </div>

              <div className="term-item">
                <div className="term-number">4</div>
                <div className="term-content">
                  <p>Não julgai a nota do teu próximo.</p>
                </div>
              </div>

              <div className="term-item special">
                <div className="term-number">5</div>
                <div className="term-content">
                  <p className="no-vacaia">SEM VACAIÁ.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-card">
            <div className="terms-card-header">
              <h3 className="terms-card-title">
                <svg className="terms-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                Contatos e Suporte
              </h3>
            </div>

            <div className="contact-grid">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7H3a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 3v1h6V3H9z"
                    />
                  </svg>
                </div>
                <div className="contact-info">
                  <h4 className="contact-title">Sugestões de Filmes</h4>
                  <p className="contact-description">Tratar com projetista Matheus Lamas</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div className="contact-info">
                  <h4 className="contact-title">Lanches Permitidos</h4>
                  <p className="contact-description">Tratar com o cozinheiro Gabriel Maneiro</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                    />
                  </svg>
                </div>
                <div className="contact-info">
                  <h4 className="contact-title">Sugestões na Planilha</h4>
                  <p className="contact-description">Tratar com o suporte técnico Vini</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="contact-info">
                  <h4 className="contact-title">Ramal Reclamações</h4>
                  <p className="contact-description">Tratar com o Tugon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="terms-footer">
          <p>
            ©{" "}
            <a
              href="https://github.com/gabrieldu4rte"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Gabriel Duarte (alesred)
            </a>{" "}
            |
            <a
              href="/terms"
              className="footer-link"
            >
            {" "}Termos de uso
            </a>{" "}
          </p>
        </div>
      </main>
    </div>
  )
}
