import { useService } from "../../hooks/useService";
import { jewelrySuggestionServiceFactory } from "../../services/jewelrySuggestionService";
import { useState, useEffect } from "react";
import styles from "./JewelrySuggestion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const JewelrySuggestion = ({ jewelryId }) => {
  const jewelrySuggestionService = useService(jewelrySuggestionServiceFactory);
  const [jewelries, setJewelries] = useState([]);

  useEffect(() => {
    jewelrySuggestionService
      .findAll(jewelryId)
      .then(setJewelries)
      .catch((err) => {
        console.log(err.message);
      });
  }, [jewelryId]);

  console.log(jewelries);

  return (
    <section className={styles["suggestion-box"]}>
      <div className={styles["title-container"]}>
        <hr className={styles["line"]} />
        <h3 className={styles["title"]}>React Gems Suggests</h3>
        <hr className={styles["line"]} />
      </div>
      <div className={styles["images-container"]}>
        {jewelries.map((j) => (
          <div className={styles["jewelry-wrapper"]}>
            <div key={j._id} className={styles["image-container"]}>
              <img
                src={j.firstImageUrl}
                alt="img"
                className={styles["image"]}
              />
            </div>
            <h4 className={styles["jewelry-suggestion-image-title"]}>{j.title}</h4>
            <button className={styles["suggestion-button"]}>Explore           <FontAwesomeIcon
            icon={faChevronRight}
            className={styles["chevron-icon"]}
          /></button>
          </div>
        ))}
      </div>
    </section>
  );
};