import {
  FiGithub,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

function SocialIcons() {
  const socialLinks = [
    { name: "Github", icon: <FiGithub />, link: "https://www.github.com/lohitkolluri" },
    { name: "LinkedIn", icon: <FiLinkedin />, link: "https://www.linkedin.com/in/kollurilohit/" },
    { name: "Instagram", icon: <FiInstagram />, link: "https://instagram.com/kollurilohit" },
  ];

  return (
    <div className="social-icons">
      <ul className="social-icons-list">
        {socialLinks.map(({ name, icon, link }) => (
          <li key={name} title={name} className="social-icons-list-item">
            <a
              href={link}
              className="social-icons-list-item-link"
              target="_blank"
              rel="noopener noreferrer" // This ensures security and performance
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocialIcons;
