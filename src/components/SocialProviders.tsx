import Image from "next/image";

const providers = [
  {
    name: "Google",
    icon: "/google.svg",
    label: "Continue with Google",
  },
  {
    name: "Apple",
    icon: "/apple.svg",
    label: "Continue with Apple",
  },
];

const SocialProviders = () => {
  return (
    <div className="flex flex-col gap-3">
      {providers.map((provider) => (
        <button
          key={provider.name}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-full border border-light-300 bg-light-100 px-6 py-3 text-body-medium font-medium text-dark-900 transition-colors hover:bg-light-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-900"
          aria-label={provider.label}
        >
          <Image
            src={provider.icon}
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
          />
          <span>{provider.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SocialProviders;
