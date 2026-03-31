export default function Home() {
  const env = process.env.NEXT_PUBLIC_ENV;

  return (
    <div className="under-construction">
      <img src="/working-under-construction.gif" alt="Under Construction" />
      <h1>Something amazing is on its way</h1>
      <p>
        Our site is currently under construction. <br /> Stay tuned!
      </p>
      {env && <span className="env-badge">{env}</span>}
    </div>
  );
}
