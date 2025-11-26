

function DailyForecast() {
  return (
    <section className="grid gap-5">
      <h3 className="font-semibold text-[20px] text-neutral-0 leading-[120%]">
        Daily forecast
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="grid gap-4 py-4 px-2.5 rounded-xl bg-neutral-800 border border-neutral-600"></div>
      </div>
    </section>
  );
}

export default DailyForecast
