import React from "react"
import { useEffect, useState } from "react"
import api from "../api/axios"
import { useAuth } from "../contexts/AuthContext"
import { GiClapperboard } from "react-icons/gi"
import "./SearchPage.css"

export default function SearchPage() {
  const { logout } = useAuth()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [ratedList, setRatedList] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [movieRatings, setMovieRatings] = useState([])
  const [movieAverage, setMovieAverage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoadingRatings, setIsLoadingRatings] = useState(false)
  const [isLoadingRated, setIsLoadingRated] = useState(true)
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    setIsLoadingRated(true)
    api
      .get("/rated")
      .then((resp) => {
        // Garante que resp.data é um array antes de definir ratedList
        setRatedList(Array.isArray(resp.data) ? resp.data : [])
      })
      .catch(console.error)
      .finally(() => setIsLoadingRated(false))
  }, [])

  async function onSearch(e) {
    e.preventDefault()
    setIsLoadingSearch(true)
    setHasSearched(true)
    try {
      const resp = await api.get("/search", { params: { query } })
      // Garante que resp.data é um array antes de definir results
      setResults(Array.isArray(resp.data) ? resp.data : [])
    } catch (error) {
      console.error("Error searching movies:", error)
      setResults([])
    } finally {
      setIsLoadingSearch(false)
    }
  }

  async function onWatch(tmdb_id) {
    await api.post(`/${tmdb_id}/watch`)
    alert("Marcado como assistido!")
  }

  async function openMovieModal(movie) {
    setSelectedMovie(movie)
    setIsModalOpen(true)
    setIsLoadingRatings(true)

    try {
      const resp = await api.get(`/${movie.tmdb_id}/ratings`)
      // Garante que resp.data.ratings é um array antes de definir movieRatings
      setMovieRatings(Array.isArray(resp.data.ratings) ? resp.data.ratings : [])
      setMovieAverage(resp.data.average)
    } catch (error) {
      console.error("Error fetching ratings:", error)
      setMovieRatings([])
      setMovieAverage(0)
    } finally {
      setIsLoadingRatings(false)
    }
  }

  function closeModal() {
    setIsModalOpen(false)
    setSelectedMovie(null)
    setMovieRatings([])
    setMovieAverage(0)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 10 }, (_, index) => {
      const starValue = index + 1
      const isFilled = starValue <= rating

      return (
        <svg
          key={index}
          className={`modal-star-icon ${isFilled ? "filled" : ""}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    })
  }

  return (
    <div className="search-container">
      <div className="search-background" />

      <header className="search-header">
        <div className="header-content">
          <div className="brand-section">
            <div className="brand-logo">
              <GiClapperboard className="logo-icon" />
            </div>
            <h1 className="brand-title">TMDB - Tropa Movie Database</h1>
          </div>

          <div className="header-actions">
            <a href="/watched" className="nav-button">
              <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Filmes Assistidos
            </a>

            <button onClick={logout} className="logout-button">
              <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Filmes Avaliados
            </h2>
          </div>

          <div className="movies-grid">
            {isLoadingRated ? (
              <div className="rated-loading">
                <div className="loading-spinner"></div>
                <p>Carregando filmes avaliados...</p>
              </div>
            ) : Array.isArray(ratedList) && ratedList.length > 0 ? (
              ratedList.map((f) => (
                <div key={f.tmdb_id} className="movie-card rated-card clickable" onClick={() => openMovieModal(f)}>
                  <div className="movie-poster">
                    <img src={f.poster || "/placeholder.svg"} alt={f.title} className="poster-image" />
                  </div>
                  <div className="movie-info">
                    <h3 className="movie-title">{f.title}</h3>
                    <div className="movie-rating">
                      <svg className="star-icon" fill="#fbbf24" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="rating-value">{f.average.toFixed(2)}</span>
                      <span className="rating-count">({f.count})</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-rated-movies">
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
                <h3 className="empty-title">Nenhum filme avaliado ainda</h3>
                <p className="empty-description">
                  Quando os usuários começarem a avaliar filmes, eles aparecerão aqui com suas respectivas notas médias.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Buscar Filmes
            </h2>
          </div>

          <div className="search-form-container">
            <form onSubmit={onSearch} className="search-form">
              <div className="search-input-wrapper">
                <svg className="search-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Digite o título do filme..."
                  className="search-input"
                />
              </div>
              <button type="submit" className="search-button">
                <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Buscar
              </button>
            </form>
          </div>

          {hasSearched && (
            <div className="search-results">
              <h3 className="results-title">Resultados da Busca</h3>
              <div className="movies-grid">
                {isLoadingSearch ? (
                  <div className="search-loading">
                    <div className="loading-spinner"></div>
                    <p>Buscando filmes...</p>
                  </div>
                ) : Array.isArray(results) && results.length > 0 ? (
                  results.map((m) => {
                    const posterUrl = m.poster_path
                      ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                      : "/placeholder.svg"

                    return (
                      <div key={m.id} className="movie-card search-card">
                        <div className="movie-poster">
                          <img src={posterUrl || "/placeholder.svg"} alt={m.title} className="poster-image" />
                        </div>
                        <div className="movie-info">
                          <h3 className="movie-title">{m.title}</h3>
                          <button onClick={() => onWatch(m.id)} className="watch-button">
                            <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Marcar como Assistido
                          </button>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="empty-search-results">
                    <div className="empty-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="empty-title">Nenhum filme encontrado</h3>
                    <p className="empty-description">Tente buscar com um termo diferente ou verifique a ortografia.</p>
                  </div>
                )}
              </div>
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

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-movie-info">
                {selectedMovie && (
                  <>
                    <img
                      src={selectedMovie.poster || "/placeholder.svg"}
                      alt={selectedMovie.title}
                      className="modal-poster"
                    />
                    <div className="modal-title-section">
                      <h2 className="modal-movie-title">{selectedMovie.title}</h2>
                      <div className="modal-average-rating">
                        <div className="modal-average-score">{movieAverage.toFixed(1)}</div>
                        <div className="modal-average-stars">{renderStars(movieAverage)}</div>
                        <div className="modal-rating-count">{movieRatings.length} avaliações</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button className="modal-close-button" onClick={closeModal}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              {isLoadingRatings ? (
                <div className="modal-loading">
                  <div className="loading-spinner"></div>
                  <p>Carregando avaliações...</p>
                </div>
              ) : Array.isArray(movieRatings) && movieRatings.length > 0 ? (
                <div className="modal-ratings-list">
                  {movieRatings.map((rating, index) => (
                    <div key={index} className="modal-rating-card">
                      <div className="modal-rating-header">
                        <div className="modal-user-info">
                          <div className="modal-user-avatar">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <div className="modal-user-details">
                            <span className="modal-user-name">{rating.user.name}</span>
                            <span className="modal-rating-date">
                              {new Date(rating.created_at).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        </div>
                        <div className="modal-rating-score">
                          <div className="modal-score-stars">{renderStars(rating.score)}</div>
                          <span className="modal-score-number">{rating.score}/10</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="modal-empty-state">
                  <svg className="modal-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  <h3>Nenhuma avaliação encontrada</h3>
                  <p>Este filme ainda não foi avaliado por nenhum usuário.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
