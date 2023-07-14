import './App.css';
import { useState } from "react";

function App() {
    const [passwordStrength, setPasswordStrength] = useState("");
    const [passwordLabel, setPasswordLabel] = useState("Password");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordColor, setPasswordColor] = useState(["gray", "gray", "gray"]);

    const calculateStrength = (passwordInput) => {
        if (passwordInput.length < 8) {
            setPasswordColor(["red", "red", "red"]);
            return 'Weak';
        }

        let score = 0;

        if (/^[a-zA-Z0-9!@#$%^&*()]+$/.test(passwordInput)) {
            score += 0;
        }

        if (/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()])|(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[0-9])(?=.*[!@#$%^&*()])/.test(passwordInput)) {
            score += 1;
        }

        if (/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*().,])(?=.*[0-9])/.test(passwordInput)) {
            score += 1;
        }

        if (score === 0) {
            setPasswordColor(["red", "gray", "gray"]);
            return 'Easy';
        } else if (score === 1) {
            setPasswordColor(["yellow", "yellow", "gray"]);
            return 'Medium';
        } else {
            setPasswordColor(["green", "green", "green"]);
            return 'Strong';
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPasswordInput(newPassword);

        setPasswordLabel(calculateStrength(newPassword));
        setPasswordInput(passwordStrength);
    };

    const sectionStyles = passwordColor.map((color) => ({
        backgroundColor: color,
    }));

    return (
        <div className="text-3xl">
            <input
                className="bg-gray-200 p-2"
                onChange={handlePasswordChange}
            />
            <div className={`text-${passwordColor[0]}-500`}>{passwordLabel}</div>
            <div className="flex flex-row">
                <div className="h-1 w-24" style={sectionStyles[0]}></div>
                <div className="h-1 w-24" style={sectionStyles[1]}></div>
                <div className="h-1 w-24" style={sectionStyles[2]}></div>
            </div>
        </div>
    );
}

export default App;
