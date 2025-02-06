const Loader = () => {
  return (
    <div id="wifi-loader">
      <svg viewBox="0 0 86 86" className="circle-outer">
        <circle r={40} cy={43} cx={43} className="back" />
        <circle r={40} cy={43} cx={43} className="front" />
        <circle r={40} cy={43} cx={43} className="new" />
      </svg>
      <svg viewBox="0 0 60 60" className="circle-middle">
        <circle r={27} cy={30} cx={30} className="back" />
        <circle r={27} cy={30} cx={30} className="front" />
      </svg>
    </div>
  );
};

export default Loader;
