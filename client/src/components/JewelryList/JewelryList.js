import { JewelryListItems } from "./JewelryListItems/JewelryListItems";
import styles from "./JewelryList.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { useJewelryList } from "../../hooks/useJewelryList";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "../Dropdown/Dropdown";

const MENU_LABELS = {
  Collection: "collection",
  StoneType: "stoneType",
  StoneColor: "stoneColor",
  NewToOld: "New To Old",
};

const MENU_SUB_LABELS = {
  Collection: "collection",
  StoneType: "stoneType",
  StoneColor: "stoneColor",
  NewToOld: "Sort By:",
};

const SORT_BY_OPTIONS = {
  LowToHigh: "lowToHigh",
  HighToLow: "highToLow",
  NewToReactGems: "newToReactGems",
};

// const SERVICES_BY_OPTIONS = {

// }

export const JewelryList = ({ entityId, serviceFactory }) => {
  const {
    setJewelries,
    jewelries,
    loadMoreDisabled,
    loading,
    handleLoadMore,
    handleMouseEnter,
    handleMouseLeave,
    fetchData,
    setPage,
  } = useJewelryList(serviceFactory, entityId);

  const [sortByNewToOld, setSortByNewToOld] = useState(true);
  const [sortByLowToHigh, setSortByLowToHigh] = useState(false);
  const [sortByHighToLow, setSortByHighToLow] = useState(false);

  useEffect(() => {
    setJewelries([]);
    setPage(0);
    fetchData(true);
  }, [entityId]);

  const handleLikedByUser = (id) => {
    setJewelries((prevJewelries) =>
      prevJewelries.map((jewelry) =>
        jewelry._id === id
          ? { ...jewelry, isLikedByUser: !jewelry.isLikedByUser }
          : jewelry
      )
    );
    fetchData();
  };

  const clickSortByNewToOldHandler = () => {
    setSortByNewToOld(true);
    setSortByLowToHigh(false);
    setSortByHighToLow(false);
  };

  const clickSortByLowToHighHandler = () => {
    setSortByNewToOld(false);
    setSortByLowToHigh(true);
    setSortByHighToLow(false);
  };

  const clickSortByHighToLowHandler = () => {
    setSortByNewToOld(false);
    setSortByLowToHigh(false);
    setSortByHighToLow(true);
  };

  return (
    <section className={styles["jewelries-box"]}>
      <div className={styles["jewelries-nav"]}>
        <div className={styles["filter-by-container"]}>
          <div>Filter By:</div>
          <ul className={styles["filter-list"]} role="list">
            <li className={styles["filter-item"]}>
              <button className={styles["filter-button"]}>
                Collection{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={styles["heart"]}
                />
              </button>
            </li>
            <li className={styles["filter-item"]}>
              <button className={styles["filter-button"]}>
                Stone Type{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={styles["heart"]}
                />
              </button>
            </li>
            <li className={styles["filter-item"]}>
              <button className={styles["filter-button"]}>
                Stone Color{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={styles["heart"]}
                />
              </button>
            </li>
          </ul>
        </div>
        <div className={styles["sort-by-container"]}>
          <Dropdown
            label={MENU_LABELS.NewToOld}
            subLabel={MENU_SUB_LABELS.NewToOld}
          >
            <ul className={styles["sort-list"]} role="list">
              <li className={styles["filter-item"]}>
                <button
                  className={styles["filter-button"]}
                  onClick={clickSortByNewToOldHandler}
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={`${styles["circle"]} ${
                      sortByNewToOld === true ? styles["circle-selected"] : ""
                    }`.trim()}
                  />
                  New To Old
                </button>
              </li>
              <li className={styles["filter-item"]}>
                <button
                  className={styles["filter-button"]}
                  onClick={clickSortByLowToHighHandler}
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={`${styles["circle"]} ${
                      sortByLowToHigh === true ? styles["circle-selected"] : ""
                    }`.trim()}
                  />
                  Price: Low To High
                </button>
              </li>
              <li className={styles["filter-item"]}>
                <button
                  className={styles["filter-button"]}
                  onClick={clickSortByHighToLowHandler}
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={`${styles["circle"]} ${
                      sortByHighToLow === true ? styles["circle-selected"] : ""
                    }`.trim()}
                  />
                  Price: High To Low
                </button>
              </li>
            </ul>
          </Dropdown>
        </div>
      </div>
      <div className={styles["jewelries-container"]}>
        {jewelries.map((j) => (
          <JewelryListItems
            key={j._id}
            {...j}
            handleMouseEnter={handleMouseEnter}
            handleLikedByUser={handleLikedByUser}
            handleMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles["load-more-button"]}>
          <LoadMoreButton
            handleLoadMore={handleLoadMore}
            loadMoreDisabled={loadMoreDisabled}
          />
        </div>
      )}
    </section>
  );
};
