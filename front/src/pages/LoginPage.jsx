import React from "react"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { GiClapperboard } from "react-icons/gi";
import "./LoginPage.css"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [err, setErr] = useState(null)
  const { login } = useAuth()
  const nav = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    const ok = await login(email, pwd)
    if (ok) nav("/search")
    else setErr("Credenciais inválidas")
  }

  return (
    <div className="login-container">
      <div className="login-background"></div>

      <div className="login-wrapper">

        <div className="login-header">
          <div className="login-logo">
            <GiClapperboard className="login-logo-icon" />
          </div>
          <h1 className="login-title">TMDB - Tropa Movie Database</h1>
          <p className="login-subtitle">A central de filmes da maior tropa do Discord</p>
        </div>

        <div className="login-card">
          <div className="card-header">
            <h2 className="card-title">Bem vindo</h2>
            <p className="card-subtitle">Acesse sua conta para tirar uma pira monstruosa</p>
          </div>

          <form onSubmit={onSubmit} className="login-form">
            {err && (
              <div className="error-alert">
                <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{err}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  id="password"
                  type="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="Digite sua senha"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox" />
                <span>Lembre de mim</span>
              </label>
              <a href="https://www.youtube.com/watch?v=n0w_eYKcdiM" className="forgot-link">
                Esqueceu sua senha?
              </a>
            </div>

            <button type="submit" className="submit-button">
              Entrar
            </button>
          </form>

          <div className="signup-link">
            <p>
              Ainda não uma tem conta?{" "}
              <a href="/register" className="link">
                Tente se registrar
              </a>
            </p>
          </div>
        </div>

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
      </div>
    </div>
  )
}
