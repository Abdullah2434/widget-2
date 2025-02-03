interface EventCardProps {
    imageSrc: string;
    title: string;
    description: string;
    onThemeChange: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ imageSrc, title, description, onThemeChange }) => {
    return (
        <div className="w-full md:w-1/2 flex flex-col items-center">
            <img
                src={imageSrc}
                alt="Event Poster"
                className="rounded-lg shadow-lg w-full md:w-3/4"
            />
            <div className="w-full md:w-3/4 text-center mt-4">
                <h1 className="text-3xl font-bold text-black dark:text-white">{title}</h1>
                <p className="text-[12px] mt-2 text-black dark:text-white">
                    {description}
                </p>
                <button
                    className="mt-6 w-full py-3 rounded-lg bg-button-background font-[JKRHaasGrotesk] text-[24px] text-white dark:text-black font-bold"
                    onClick={onThemeChange}
                >
                    Theme Change
                </button>
            </div>
        </div>
    );
};

export default EventCard;
