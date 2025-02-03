import ChildComponent from '../components/TicketSection/TicketComponent';
import { useSearchParams } from "react-router-dom";

export function TicketSelectionScreen() {
  const [searchParams] = useSearchParams();
  let color = searchParams.get("color") || "#ffffff"; // Default to white if no color is provided

  console.log("color in params:", color);

  return (
    <div
      className={`flex flex-col md:flex-row items-center w-full min-h-screen bg-white dark:bg-[${color}]`} 
    >
      <ChildComponent />
    </div>
  );
};
