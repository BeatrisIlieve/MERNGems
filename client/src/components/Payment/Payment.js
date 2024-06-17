import { DynamicFormAuthUser } from "../DynamicForm/DynamicFormAuthUser";
import { useService } from "../../hooks/useService";
import { addressInformationServiceFactory } from "../../services/addressInformationService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { useState, useEffect } from "react";
import { hasFormErrorOccurred } from "../../utils/hasFormErrorOccurred";
import {
  INITIAL_FORM_VALUES,
  FORM_KEYS,
} from "../User/Account/AccountDetails/AddressInformationFormPopup/initialFormValues";
import styles from "./Payment.module.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBagContext } from "../../contexts/BagContext";
import { authServiceFactory } from "../../services/authService";
import { OrderSummary } from "../OrderSummary/OrderSummary";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { personalInformationServiceFactory } from "../../services/personalInformationService";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

export const Payment = () => {
  const { bagItems, totalPrice, totalQuantity, loading } = useBagContext();
  const authService = useService(authServiceFactory);
  const { userId } = useAuthContext();
  const [user, setUser] = useState([]);
  const addressInformationService = useService(
    addressInformationServiceFactory
  );
  const [userInformation, setUserInformation] = useState([]);
  const personalInformationService = useService(
    personalInformationServiceFactory
  );
  const [userPersonalInformation, setUserPersonalInformation] = useState([]);

  useEffect(() => {
    personalInformationService
      .find(userId)
      .then((data) => {
        setUserPersonalInformation(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userInformation]);

  useEffect(() => {
    authService
      .find(userId)
      .then((dataFromServer) => {
        setUser(dataFromServer);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  const {
    values,
    updateForm,
    clickHandler,
    blurHandler,
    changeHandler,
    submitHandler,
  } = useForm(INITIAL_FORM_VALUES);

  useEffect(() => {
    addressInformationService
      .find(userId)
      .then((data) => {
        setUserInformation(data);
        updateForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userInformation]);

  const onSubmit = async (e) => {
    submitHandler(e);

    const errorOccurred = hasFormErrorOccurred(values);

    if (!errorOccurred) {
      const phoneNumber = values.phoneNumber.fieldValue;
      const country = values.country.fieldValue;
      const city = values.city.fieldValue;
      const street = values.street.fieldValue;
      const apartment = values.apartment.fieldValue;
      const zipCode = values.zipCode.fieldValue;

      const data = {
        phoneNumber,
        country,
        city,
        street,
        apartment,
        zipCode,
      };

      try {
        await addressInformationService.update(userId, data);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <section className={styles["complete-order-box"]}>
      <div>
        <div className={styles["title-container"]}>
          <h2 className={styles["title"]}>Checkout</h2>
          <div className={styles["title-sub-container"]}>
            <h4 className={styles["main-sub-title"]}>Shipping</h4>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={styles["arrow"]}
            />
            <h4 className={styles["sub-title"]}>Payment</h4>
          </div>
        </div>
        <div className={styles["complete-order-container"]}>
          <div className={styles["complete-order-left-container"]}>
            <div className={styles["complete-order-left-container-sticky"]}>
              <div className={styles["left-top-container"]}>
                <div className={styles["left-top-upper-container"]}>
                  <h4 className={styles["left-top-container-title"]}>
                    Shipping Information
                  </h4>
                  <button className={styles["left-top-container-edit-button"]}>
                    Edit
                  </button>
                </div>
                <div className={styles["left-bottom-sub-container"]}>
                  <h5 className={styles["left-bottom-container-email-title"]}>
                    Email
                  </h5>
                  <h4 className={styles["left-bottom-container-email"]}>
                    {user.email}
                  </h4>
                  <div className={styles["bag-left-container-title"]}>
                    <span
                      className={
                        styles["bag-left-container-title-with-padding"]
                      }
                    >
                      <FontAwesomeIcon
                        icon={faTruck}
                        className={styles["delivery-icon"]}
                      />
                    </span>
                    <span className={styles["delivery-title"]}>Delivery</span>
                    <span className={styles["delivery-span"]}>
                      ({totalQuantity} {totalQuantity > 1 ? "items" : "item"})
                    </span>
                    <ul role="list">
                      <li>
                        {userPersonalInformation.firstName}{" "}
                        {userPersonalInformation.lastName}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles["left-bottom-container"]}>
                <h4 className={styles["left-bottom-container-title"]}>
                  Shipping Information
                </h4>
                <h4 className={styles["left-bottom-container-email"]}>
                  {user.email}
                </h4>
              </div>
            </div>
          </div>
          <div className={styles["complete-order-right-container"]}>
            <div className={styles["complete-order-right-container-sticky"]}>
              <h4 className={styles["order-summary-title"]}>Order Summary</h4>
              <ul role="list">
                {bagItems.map((item) => (
                  <li
                    key={item._id}
                    className={styles["bag-left-sub-left-container"]}
                  >
                    <OrderSummary {...item} />
                  </li>
                ))}
              </ul>
              <div className={styles["flex-container-line"]}>
                <hr className={styles["hr-line"]} />
                <img
                  className={styles["line-img"]}
                  src="https://res.cloudinary.com/deztgvefu/image/upload/v1707499296/template_images/giphy_s_b3cfly_1_b0dwbo.gif"
                  alt=""
                />
                <hr className={styles["hr-line"]} />
              </div>
              <div className={styles["bag-right-sub-container"]}>
                <div className={styles["bag-right-sub-right-container"]}>
                  <p className={styles["bag-right-sub-container-bold"]}>
                    Subtotal
                  </p>
                  <p
                    className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-bold"]}`}
                  >
                    ${totalPrice}
                  </p>
                </div>
                <div className={styles["bag-right-sub-right-container"]}>
                  <p>Shipping</p>
                  <p
                    className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-not-bold"]}`}
                  >
                    Complimentary
                  </p>
                </div>
                <div className={styles["bag-right-sub-right-container"]}>
                  <p className={styles["bag-right-sub-container-bold"]}>
                    Total
                  </p>
                  <p
                    className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-bold"]}`}
                  >
                    ${totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </section>
  );
};
