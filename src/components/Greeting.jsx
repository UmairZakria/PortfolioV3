import { useEffect, useState } from 'react';

function Greeting() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) return 'Good morning!';
      if (hour >= 12 && hour < 17) return 'Good afternoon!';
      if (hour >= 17 && hour < 21) return 'Good evening!';
      return 'Good night!';
    };

    setGreeting(getGreeting());
  }, []);

  return (
    <div className="text-[13px] xl:text-[16px] text-gray-300 font-extralight hover:text-white font-Raleway">
      {greeting}
    </div>
  );
}

export default Greeting;
