import styles from "./header.module.css"
import Logo from "/logo.png"

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoImage}>
            <img src={Logo} alt="Logo" className={styles.image} />
          </div>
          <span className={styles.logoText}>BassTab</span>
        </div>
      </div>
    </header>
  )
}
