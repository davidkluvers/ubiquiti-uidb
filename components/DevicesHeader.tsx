import styles from './DevicesHeader.module.scss';
import React, {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
} from 'react';
import clsx from 'clsx';
import { DeviceType, DevicesType } from 'types/global';

interface DevicesHeaderProps {
  autocompleteSuggestions: DevicesType;
  isFilterOpen: boolean;
  isGridView: boolean;
  isSearchFocused: boolean;
  filterValues: Set<string>;
  filterLineNames: (string | undefined)[];
  searchInput: string;
  deviceCount: number;
  listButtonClick: MouseEventHandler<HTMLButtonElement>;
  gridButtonClick: MouseEventHandler<HTMLButtonElement>;
  filterClick: MouseEventHandler<HTMLButtonElement>;
  setIsSearchFocused: Dispatch<SetStateAction<boolean>>;
  setSelectedDevice: React.Dispatch<
    React.SetStateAction<DeviceType | undefined>
  >;
  filterCheckboxInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function DevicesHeader({
  autocompleteSuggestions,
  isGridView,
  isFilterOpen,
  isSearchFocused,
  filterLineNames,
  filterValues,
  searchInput,
  deviceCount,
  listButtonClick,
  gridButtonClick,
  filterClick,
  setIsSearchFocused,
  setSelectedDevice,
  filterCheckboxInput,
  handleSearchInput,
}: DevicesHeaderProps) {
  const shouldAutocompleteShow =
    isSearchFocused && searchInput && autocompleteSuggestions.length > 0;

  useEffect(() => {
    // Define the event listener function
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Set isSearchFocused to false when the "Escape" key is pressed
        setIsSearchFocused(false);
      }
    };

    // Add the event listener to the document
    document.addEventListener('keydown', handleEscapeKey);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const highlightMatch = (suggestion?: string, query?: string) => {
    if (!suggestion || !query) return '';
    // Escape special characters in the query to avoid issues with regular expressions
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create a regular expression for global and case-insensitive matching
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    // Use replace with a callback function to wrap matched portions in <span> elements
    const highlightedSuggestion = suggestion.replace(
      regex,
      (match) => `<span class="${styles.highlight}">${match}</span>`
    );

    return `<span>${highlightedSuggestion}</span>`;
  };

  return (
    <div className={styles.devicesHeader}>
      <div className={styles.deviceSearch}>
        <input
          className={styles.deviceSearchInput}
          placeholder="Search"
          value={searchInput}
          onChange={handleSearchInput}
          onFocus={() => setIsSearchFocused(true)}
        />
        <span className={styles.deviceCount}>{deviceCount} Devices</span>
        {shouldAutocompleteShow && (
          <>
            <div
              className={styles.autocompleteScrim}
              onClick={() => setIsSearchFocused(false)}
            ></div>
            <div className={styles.autocompleteDropdown}>
              <ul className={styles.autocompleteDropdownList}>
                {autocompleteSuggestions.map((suggestion, index) => (
                  <li
                    className={styles.autocompleteDropdownListItem}
                    key={index}
                  >
                    {suggestion.product && suggestion.shortnames && (
                      <button
                        className={styles.autocompleteDropdownListButton}
                        dangerouslySetInnerHTML={{
                          __html:
                            highlightMatch(
                              suggestion.product.name,
                              searchInput
                            ) +
                            highlightMatch(
                              suggestion.shortnames[0],
                              searchInput
                            ),
                        }}
                        onClick={() => setSelectedDevice(suggestion)}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <div className={styles.headerControls}>
        <div className={styles.headerControls}>
          <button
            className={clsx(
              styles.iconButton,
              !isGridView && styles.iconButtonActive
            )}
            onClick={listButtonClick}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="a" fill="#fff">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm1.75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5ZM4.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm3.25-2.25h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5ZM4.5 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm3.25-2.25h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5Z"
                />
              </mask>
              <path
                className={styles.fillClass}
                d="M4.5 7A2.5 2.5 0 0 0 7 4.5H5a.5.5 0 0 1-.5.5v2ZM2 4.5A2.5 2.5 0 0 0 4.5 7V5a.5.5 0 0 1-.5-.5H2ZM4.5 2A2.5 2.5 0 0 0 2 4.5h2a.5.5 0 0 1 .5-.5V2ZM7 4.5A2.5 2.5 0 0 0 4.5 2v2a.5.5 0 0 1 .5.5h2Zm9.25-1.75h-8.5v2h8.5v-2ZM18 4.5a1.75 1.75 0 0 0-1.75-1.75v2A.25.25 0 0 1 16 4.5h2Zm-1.75 1.75A1.75 1.75 0 0 0 18 4.5h-2a.25.25 0 0 1 .25-.25v2Zm-8.5 0h8.5v-2h-8.5v2ZM6 4.5c0 .966.784 1.75 1.75 1.75v-2A.25.25 0 0 1 8 4.5H6Zm1.75-1.75A1.75 1.75 0 0 0 6 4.5h2a.25.25 0 0 1-.25.25v-2ZM5 10a.5.5 0 0 1-.5.5v2A2.5 2.5 0 0 0 7 10H5Zm-.5-.5a.5.5 0 0 1 .5.5h2a2.5 2.5 0 0 0-2.5-2.5v2ZM4 10a.5.5 0 0 1 .5-.5v-2A2.5 2.5 0 0 0 2 10h2Zm.5.5A.5.5 0 0 1 4 10H2a2.5 2.5 0 0 0 2.5 2.5v-2Zm11.75-2.25h-8.5v2h8.5v-2ZM18 10a1.75 1.75 0 0 0-1.75-1.75v2A.25.25 0 0 1 16 10h2Zm-1.75 1.75A1.75 1.75 0 0 0 18 10h-2a.25.25 0 0 1 .25-.25v2Zm-8.5 0h8.5v-2h-8.5v2ZM6 10c0 .966.784 1.75 1.75 1.75v-2A.25.25 0 0 1 8 10H6Zm1.75-1.75A1.75 1.75 0 0 0 6 10h2a.25.25 0 0 1-.25.25v-2ZM5 15.5a.5.5 0 0 1-.5.5v2A2.5 2.5 0 0 0 7 15.5H5Zm-.5-.5a.5.5 0 0 1 .5.5h2A2.5 2.5 0 0 0 4.5 13v2Zm-.5.5a.5.5 0 0 1 .5-.5v-2A2.5 2.5 0 0 0 2 15.5h2Zm.5.5a.5.5 0 0 1-.5-.5H2A2.5 2.5 0 0 0 4.5 18v-2Zm11.75-2.25h-8.5v2h8.5v-2ZM18 15.5a1.75 1.75 0 0 0-1.75-1.75v2a.25.25 0 0 1-.25-.25h2Zm-1.75 1.75A1.75 1.75 0 0 0 18 15.5h-2a.25.25 0 0 1 .25-.25v2Zm-8.5 0h8.5v-2h-8.5v2ZM6 15.5c0 .966.784 1.75 1.75 1.75v-2a.25.25 0 0 1 .25.25H6Zm1.75-1.75A1.75 1.75 0 0 0 6 15.5h2a.25.25 0 0 1-.25.25v-2Z"
                fill="#838691"
                mask="url(#a)"
              />
            </svg>
          </button>
          <button
            className={clsx(
              styles.iconButton,
              isGridView && styles.iconButtonActive
            )}
            onClick={gridButtonClick}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={styles.fillClass}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.5 8.5V4H4v4.5h4.5ZM4 3h4.5a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm4.5 13v-4.5H4V16h4.5ZM4 10.5h4.5a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4.5a1 1 0 0 1 1-1ZM16 4v4.5h-4.5V4H16Zm0-1h-4.5a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1H16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm0 13v-4.5h-4.5V16H16Zm-4.5-5.5H16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1v-4.5a1 1 0 0 1 1-1Z"
                fill="#838691"
              />
            </svg>
          </button>
        </div>
        <div className={styles.filtersContainer}>
          <button
            className={clsx(
              styles.filterButton,
              !!filterValues.size && styles.filterButtonActive
            )}
            onClick={filterClick}
          >
            Filter {!!filterValues.size && `(${filterValues.size})`}
          </button>
          {isFilterOpen && (
            <div className={styles.filters}>
              <p className={styles.filterTitle}>Product Line</p>
              <ul className={styles.filterList}>
                {filterLineNames.map((lineName, index) => (
                  <li
                    className={styles.filterListItem}
                    key={lineName ?? '' + index}
                  >
                    <input
                      className={styles.filterListInput}
                      type="checkbox"
                      value={lineName}
                      onInput={filterCheckboxInput}
                    />
                    <span className={styles.filterLisLabel}>{lineName}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
