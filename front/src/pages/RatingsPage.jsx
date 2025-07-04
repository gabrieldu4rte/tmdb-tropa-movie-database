import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { GiClapperboard } from 'react-icons/gi';
import './RatingsPage.css';

export default function RatingsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie]     = useState({});
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);
  const [score, setScore]     = useState(5);

  useEffect(() => {
    api.get(`/${id}/ratings`)
      .then(resp => {
        setMovie(resp.data.movie);
        setRatings(resp.data.ratings);
        setAverage(resp.data.average);
      })
      .catch(console.error);
  }, [id]);

  async function onSubmit(e) {
    e.preventDefault();
    const resp = await api.post(`/${id}/rating`, { score });

    setAverage(resp.data.average);
    setRatings(prev => [
      resp.data.rating,
      ...prev
    ]);
  }

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return Array.from({ length: 10 }, (_, index) => {
      const starValue = index + 1
      const isFilled = starValue <= rating
      const isHalf = !isFilled && starValue - 0.5 <= rating

      return (
        <button
          key={index}
          type="button"
          className={`star-button ${interactive ? "interactive" : ""} ${isFilled ? "filled" : ""} ${
            isHalf ? "half" : ""
          }`}
          onClick={interactive ? () => onStarClick(starValue) : undefined}
          disabled={!interactive}
        >
          <svg className="star-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
      );
    });
  };

  return (
    <div className="ratings-container">
      <div className="ratings-background" />

      <header className="ratings-header">
        <div className="header-content">
          <div className="brand-section">
            <div className="brand-logo">
              <GiClapperboard className="logo-icon" />
            </div>
            <h1 className="brand-title">TMDB - Tropa Movie Database</h1>
          </div>
          <a href="/watched" className="back-button">
            <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </a>
        </div>
      </header>

      <main className="main-content">
        <div className="rating-movie-details">
          <div className="rating-movie-poster">
            <img
              src={movie.poster || '/placeholder.svg'}
              alt={movie.title}
              className="rating-poster-image"
            />
          </div>
          <h2 className="rating-movie-title">{movie.title}</h2>
        </div>

        <div className="page-header">
          <div className="rating-summary">
            <h2 className="page-title">
              <svg className="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              Avaliações do Filme
            </h2>
            <div className="average-rating">
              <div className="average-score">{average.toFixed(1)}</div>
              <div className="average-stars">{renderStars(average)}</div>
              <div className="rating-count">{ratings.length} avaliações</div>
            </div>
          </div>
        </div>

        <section className="add-rating-section">
          <div className="section-card">
            <h3 className="section-title">Adicionar Avaliação</h3>
            <form onSubmit={onSubmit} className="rating-form">
              <div className="star-rating-input">
                <label className="rating-label">Sua avaliação:</label>
                <div className="stars-container">
                  {renderStars(score, true, setScore)}
                  <span className="score-display">{score}/10</span>
                </div>
              </div>
              <button type="submit" className="submit-rating-button">
                <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Avaliar Filme
              </button>
            </form>
          </div>
        </section>

        <section className="ratings-list-section">
          <h3 className="section-title">
            <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            Todas as Avaliações
          </h3>
          {ratings.length > 0 ? (
            <div className="ratings-grid">
              {ratings.map((r, idx) => (
                <div key={idx} className="rating-card">
                  <div className="rating-header">
                    <div className="user-info">
                      <div className="user-avatar">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div className="user-details">
                        <span className="user-name">{r.user.name}</span>
                        <span className="rating-date">
                          {new Date(r.created_at)
                            .toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <div className="rating-score">
                      <div className="score-stars">{renderStars(r.score)}</div>
                      <span className="score-number">{r.score}/10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
           <div className="empty-ratings">
              <div className="empty-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h4 className="empty-title">Nenhuma avaliação ainda</h4>
              <p className="empty-description">Seja o primeiro a avaliar este filme!</p>
            </div>
          )}
        </section>

        <div className="register-footer">
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
  );
}
