import { useEffect, useMemo, useState } from 'react'
import { Calculator, Info } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { formatCurrency } from '../lib/format'

export default function MortgageCalculator({ initialPrice }) {
  const [price, setPrice] = useState(initialPrice)
  const [downPercent, setDownPercent] = useState(20)
  const [rate, setRate] = useState(5.5)
  const [years, setYears] = useState(25)

  useEffect(() => {
    setPrice(initialPrice)
  }, [initialPrice])

  const result = useMemo(() => {
    const safePrice = Math.max(0, Number(price) || 0)
    const safeRate = Math.max(0, Number(rate) || 0)
    const safeYears = Math.max(1, Number(years) || 1)
    const downPayment = safePrice * (downPercent / 100)
    const principal = Math.max(0, safePrice - downPayment)
    const monthlyRate = safeRate / 100 / 12
    const payments = safeYears * 12

    let monthly = 0
    if (principal > 0 && payments > 0) {
      monthly =
        monthlyRate === 0
          ? principal / payments
          : (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
            (Math.pow(1 + monthlyRate, payments) - 1)
    }

    const totalPaid = monthly * payments
    return {
      downPayment,
      principal,
      monthly,
      totalPaid,
      interest: Math.max(0, totalPaid - principal),
      principalShare: totalPaid > 0 ? (principal / totalPaid) * 100 : 100,
    }
  }, [price, downPercent, rate, years])

  return (
    <section className="emi-section" aria-labelledby="emi-title">
      <div className="emi-heading">
        <span className="icon-tile" aria-hidden="true">
          <Calculator size={21} />
        </span>
        <div>
          <p className="eyebrow">Plan with clarity</p>
          <h2 id="emi-title">Estimate your monthly payment</h2>
          <p>Adjust the numbers to see an indicative mortgage payment.</p>
        </div>
      </div>

      <div className="emi-layout">
        <div className="emi-controls">
          <div className="form-field">
            <label htmlFor="emi-price">Property price</label>
            <div className="input-prefix">
              <span aria-hidden="true">{siteConfig.currency}</span>
              <input
                id="emi-price"
                type="number"
                min="0"
                step="1000"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="form-field">
            <div className="field-label-row">
              <label htmlFor="emi-down">Down payment</label>
              <output htmlFor="emi-down">
                {downPercent}% · {formatCurrency(result.downPayment)}
              </output>
            </div>
            <input
              id="emi-down"
              className="styled-range"
              type="range"
              min="0"
              max="50"
              step="1"
              value={downPercent}
              onChange={(event) => setDownPercent(Number(event.target.value))}
            />
            <div className="range-legend" aria-hidden="true">
              <span>0%</span>
              <span>50%</span>
            </div>
          </div>

          <div className="emi-split">
            <div className="form-field">
              <label htmlFor="emi-rate">Interest rate (%)</label>
              <input
                id="emi-rate"
                type="number"
                min="0"
                max="20"
                step="0.1"
                value={rate}
                onChange={(event) => setRate(Number(event.target.value))}
                inputMode="decimal"
              />
            </div>

            <div className="form-field">
              <label htmlFor="emi-years">Loan term</label>
              <select
                id="emi-years"
                value={years}
                onChange={(event) => setYears(Number(event.target.value))}
              >
                {[10, 15, 20, 25, 30].map((term) => (
                  <option key={term} value={term}>
                    {term} years
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="emi-result">
          <p className="emi-result-label">Estimated monthly payment</p>
          <output className="emi-amount">{formatCurrency(result.monthly)}</output>
          <p className="emi-result-sub">
            on a {formatCurrency(result.principal)} loan over {years} years
          </p>

          <div className="emi-bar" aria-hidden="true">
            <span style={{ width: `${Math.min(100, result.principalShare)}%` }} />
          </div>
          <div className="emi-bar-legend">
            <span>
              <i className="dot dot-principal" aria-hidden="true" /> Principal
            </span>
            <span>
              <i className="dot dot-interest" aria-hidden="true" /> Interest
            </span>
          </div>

          <dl className="emi-breakdown">
            <div>
              <dt>Loan amount</dt>
              <dd>{formatCurrency(result.principal)}</dd>
            </div>
            <div>
              <dt>Total interest</dt>
              <dd>{formatCurrency(result.interest)}</dd>
            </div>
            <div>
              <dt>Total repayment</dt>
              <dd>{formatCurrency(result.totalPaid)}</dd>
            </div>
          </dl>

          <p className="emi-note">
            <Info size={14} aria-hidden="true" />
            Indicative only. Your actual rate and payment will depend on your lender and circumstances.
          </p>
        </div>
      </div>
    </section>
  )
}
