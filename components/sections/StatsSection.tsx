const stats = [
  { value: "5+", label: "Business Sectors", description: "Diversified portfolio" },
  { value: "50+", label: "Team Members", description: "Expert professionals" },
  { value: "10+", label: "Partners", description: "Global network" },
  { value: "24/7", label: "Support", description: "Always available" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-primary-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-lg font-medium text-primary-200 mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-primary-300">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

