import React from 'react';
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api/axios"
import { GiClapperboard } from "react-icons/gi";
import "./WatchedPage.css"

export default function WatchedPage() {
  const [movies, setMovies] = useState([])
  const [isLoadingWatched, setIsLoadingWatched] = useState(true)

  useEffect(() => {
    setIsLoadingWatched(true)
    api
      .get("/watched")
      .then((resp) => setMovies(resp.data))
      .catch(console.error)
      .finally(() => setIsLoadingWatched(false))
  }, [])

  return (
    <div className="watched-container">
      <div className="watched-background"></div>

      <header className="watched-header">
        <div className="header-content">
          <div className="brand-section">
            <div className="brand-logo">
              <GiClapperboard className="logo-icon" />
            </div>
            <h1 className="brand-title">TMDB - Tropa Movie Database</h1>
          </div>

          <a href="/search" className="back-button">
            <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </a>
        </div>
      </header>

      <main className="main-content">
        <div className="page-header">
          <h2 className="page-title">
            <svg className="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Filmes Assistidos
          </h2>
          <p className="page-subtitle">
            {movies.length > 0
              ? `${movies.length} ${movies.length === 1 ? "filme assistido" : "filmes assistidos"}`
              : "Nenhum filme assistido ainda"}
          </p>
        </div>

         {isLoadingWatched ? (
          <div className="watched-loading">
            <div className="loading-spinner"></div>
            <p>Carregando filmes assistidos...</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="movies-grid">
            {movies.map((m) => (
              <div key={m.tmdb_id} className="movie-card">
                <div className="movie-poster">
                  <img
                    src={m.poster || "/placeholder.svg?height=400&width=300"}
                    alt={m.title}
                    className="poster-image"
                  />
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{m.title}</h3>
                  <div className="movie-actions">
                    <Link to={`/${m.tmdb_id}/ratings`} className="action-button primary">
                      <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Avaliar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3 className="empty-title">Nenhum filme assistido</h3>
            <p className="empty-description">
              Comece a marcar filmes como assistidos para vê-los aqui e poder avaliá-los.
            </p>
            <a href="/search" className="empty-action">
              <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Buscar Filmes
            </a>
          </div>
        )}
        <div className="login-footer">
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
