function HolaStalyn() {
  return (
    <div style={styles.container}>
      <h1 style={styles.text}>Hola Stalyn 👋</h1>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  text: {
    fontSize: '3rem',
    color: '#fff',
    fontWeight: 700,
    textShadow: '2px 2px 8px rgba(0,0,0,0.2)',
  },
};

export default HolaStalyn;
