import "./step-seven.css";
import { FormWrapper } from "../FormWrapper/FormWrapper";

type UserData = {
  recommendations: string[];
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

const contentList = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Thriller",
  "Documentary",
];

export const StepSeven = ({
  recommendations = [],
  updateFields,
}: UserFormProps) => {
  const handleCheckboxChange = (recommen: string) => {
    if (recommendations.includes(recommen)) {
      updateFields({
        recommendations: recommendations.filter((i) => i !== recommen),
      });
    } else {
      updateFields({
        recommendations: [...recommendations, recommen],
      });
    }
  };

  return (
    <FormWrapper>
      <div className="steps">
        <div className="profile-pic">
          <img src="/images/SignIn/ProfileImage.png" alt="profile image" />
        </div>
        <h3 className="step-seven-h">
          <span>6</span>
          Content recommendations
        </h3>

        <div className="step-seven">
          {recommendations &&
            contentList.map((recommen) => (
              <label
                key={recommen}
                className={`interest-item ${
                  recommendations.includes(recommen) ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={recommen}
                  checked={recommendations.includes(recommen)}
                  onChange={() => handleCheckboxChange(recommen)}
                />
                {recommen}
              </label>
            ))}
        </div>
      </div>
    </FormWrapper>
  );
};
