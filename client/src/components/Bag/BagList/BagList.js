import styles from "./BagList.module.css";
import { useBagContext } from "../../../contexts/BagContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export const BagList = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  totalPrice,
  maxQuantity,
  quantity,
  size,
}) => {
  const { onDecrement, onIncrement, onRemove } = useBagContext();
  return (
    <>
      <div className={styles["jewelry-bag-image"]}>
        <img
          className={styles["jewelry-bag-img"]}
          src={firstImageUrl}
          alt={firstImageUrl}
        />
      </div>
      <div className={styles["jewelry-bag-composition"]}>
        <h2 className={styles["jewelry-bag-composition-title"]}>
          {jewelryTitle}
        </h2>
        <span className={styles["size-span"]}>Size: {size}</span>
        <div className={styles["jewelry-bag-composition-button-container"]}>
          <button
            className={styles["jewelry-bag-composition-button"]}
            onClick={() => onRemove(_id)}
          >
            Remove
          </button>
        </div>
      </div>
      <div className={styles["jewelry-bag-price-quantity"]}>
        <h4 className={styles["jewelry-bag-price"]}>${totalPrice}</h4>
        <div className={styles["jewelry-bag-quantity"]}>
          <div>
            <button
              className={styles["jewelry-bag-quantity-button"]}
              onClick={() => onDecrement(_id)}
            >
              <FontAwesomeIcon icon={faMinus} className={styles["dark-pink"]} />
            </button>
          </div>
          <div className={styles["jewelry-bag-quantity-input"]}>{quantity}</div>
          <div>
            <button
              className={styles["jewelry-bag-quantity-button"]}
              onClick={() => onIncrement(_id)}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className={`${styles["icon-available"]} ${
                  maxQuantity === quantity ? styles["icon-not-available"] : ""
                }`.trim()}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};