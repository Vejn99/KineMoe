import { FormWrapper } from "../FormWrapper/FormWrapper";
import "./step-two.css";

type UserData = {
  interests: string[];
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

const interestsList = [
  "Cinema",
  "Visual Arts",
  "Dance",
  "Teatre",
  "Music",
  "Literature",
  "More Options",
];

export const StepTwo = ({ interests = [], updateFields }: UserFormProps) => {
  const handleCheckboxChange = (interest: string) => {
    if (interests.includes(interest)) {
      updateFields({
        interests: interests.filter((i) => i !== interest),
      });
    } else {
      updateFields({
        interests: [...interests, interest],
      });
    }
  };

  return (
    <FormWrapper>
      <div className="steps">
        <p>
          <span>1</span>
          Tell us what moves you. Select your interests to tailor your Kinemoe
          universe.
        </p>
        <div className="step-two ">
          {interestsList.map((interest) => (
            <label
              key={interest}
              className={`interest-item ${
                interests.includes(interest) ? "selected" : ""
              }`}
            >
              <input
                type="checkbox"
                value={interest}
                checked={interests.includes(interest)}
                onChange={() => handleCheckboxChange(interest)}
              />
              {interest}
            </label>
          ))}
        </div>
      </div>
    </FormWrapper>
  );
};
