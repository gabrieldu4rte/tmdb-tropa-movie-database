import React from "react"
import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"
import { GiClapperboard } from "react-icons/gi";
import "./RegisterPage.css"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setConfirm] = useState("")
  const [troopPassword, setTroopPwd] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setError(null)

    if (password !== passwordConfirm) {
      return setError("As senhas não conferem")
    }

    try {
      await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
        troop_password: troopPassword,
      })
      alert("Conta criada com sucesso!")
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.error || "Erro no registro")
    }
  }

  return (
    <div className="register-container">
      <div className="register-background"></div>

      <div className="register-wrapper">
        <div className="register-header">
          <div className="register-logo">
            <GiClapperboard className="register-logo-icon" />
          </div>
          <h1 className="register-title">TMDB - Tropa Movie Database</h1>
          <p className="register-subtitle">A central de filmes da maior tropa do Discord</p>
        </div>

        <div className="register-card">
          <div className="card-header">
            <h2 className="card-title">Criar Conta</h2>
            <p className="card-subtitle">Se registre para fazer parte da tropa</p>
          </div>

          <form onSubmit={onSubmit} className="register-form">
            {error && (
              <div className="error-alert">
                <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome (ou nick)"
                  className="form-input"
                  required
                />
              </div>
            </div>

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crie sua senha"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirm" className="form-label">
                Confirme sua Senha
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <input
                  id="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirme sua senha"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="troopPassword" className="form-label">
                Senha da Tropa
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <input
                  id="troopPassword"
                  type="password"
                  value={troopPassword}
                  onChange={(e) => setTroopPwd(e.target.value)}
                  placeholder="Digite a senha da tropa"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Criar Conta
            </button>
          </form>

          <div className="login-link">
            <p>
              Já tem uma conta?{" "}
              <a href="/login" className="link">
                Faça login aqui
              </a>
            </p>
          </div>
        </div>

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
      </div>
    </div>
  )
}
