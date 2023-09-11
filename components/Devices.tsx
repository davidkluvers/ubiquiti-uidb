import React, { useState, useEffect } from 'react';
import styles from './Devices.module.scss';
import Fuse from 'fuse.js'; // Import the Fuse.js library for fuzzy searching
import DevicesHeader from './DevicesHeader';
import DetailView from './DetailView';
import { DeviceType, DevicesType } from 'types/global';
import DeviceGrid from './DeviceGrid';
import DeviceTable from './DeviceTable';

interface DevicesProps {
  devices: DevicesType;
}

export default function Devices({ devices }: DevicesProps) {
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<Set<string>>(new Set());
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | undefined>(
    undefined
  );
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [renderedDevices, setRenderedDevices] = useState<DevicesType>(devices);
  const filterLineNames = [...new Set(devices.map((item) => item.line?.name))];
  const [autocompleteSuggestions, setAutocompleteSuggestions] =
    useState<DevicesType>([]);

  const fuseOptions = {
    keys: [
      {
        name: 'name',
        getFn: (device: DeviceType) => device.product?.name ?? '',
      },
      {
        name: 'authorName',
        getFn: (device: DeviceType) => device.shortnames?.[0] ?? '',
      },
    ],
    threshold: 0.4,
    shouldSort: true,
    minMatchCharLength: 2,
    findAllMatches: false,
  };
  const fuse = new Fuse(devices, fuseOptions);

  useEffect(() => {
    // Filter devices based on the selected filter values
    const filteredDevices = devices.filter((device) => {
      const { line } = device;

      if (line?.name) {
        return !filterValues.size || filterValues.has(line.name);
      }
    });

    setRenderedDevices(filteredDevices);

    // Perform fuzzy search and update the autocomplete suggestions
    const searchResults = fuse.search(searchInput);
    setAutocompleteSuggestions(searchResults.map((result) => result.item));
  }, [devices, filterValues, searchInput]);

  const listButtonClick = () => {
    setIsGridView(false);
  };

  const gridButtonClick = () => {
    setIsGridView(true);
  };

  const filterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const previousDevice = () => {
    if (!selectedDevice) return;

    const currentIndex = renderedDevices.indexOf(selectedDevice);
    const targetIndex =
      currentIndex === 0 ? renderedDevices.length - 1 : currentIndex - 1;

    setSelectedDevice(renderedDevices[targetIndex]);
  };

  const nextDevice = () => {
    if (!selectedDevice) return;

    const currentIndex = renderedDevices.indexOf(selectedDevice);
    const targetIndex =
      currentIndex === renderedDevices.length - 1 ? 0 : currentIndex + 1;
    setSelectedDevice(renderedDevices[targetIndex]);
  };

  const filterCheckboxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target?.value;
    console.log(newValue);
    console.log(filterValues);
    const newFilterValues = new Set(filterValues);

    if (newFilterValues.has(newValue)) {
      newFilterValues.delete(newValue);
    } else {
      newFilterValues.add(newValue);
    }

    setFilterValues(newFilterValues);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
  };

  return (
    <div className={styles.devicesContainer}>
      {selectedDevice && Object.keys(selectedDevice).length !== 0 ? (
        <DetailView
          device={selectedDevice}
          setSelectedDevice={setSelectedDevice}
          previousDevice={previousDevice}
          nextDevice={nextDevice}
        />
      ) : (
        <>
          <DevicesHeader
            autocompleteSuggestions={autocompleteSuggestions}
            isGridView={isGridView}
            listButtonClick={listButtonClick}
            gridButtonClick={gridButtonClick}
            filterClick={filterClick}
            isFilterOpen={isFilterOpen}
            isSearchFocused={isSearchFocused}
            setIsSearchFocused={setIsSearchFocused}
            filterLineNames={filterLineNames}
            filterCheckboxInput={filterCheckboxInput}
            filterValues={filterValues}
            searchInput={searchInput}
            setSelectedDevice={setSelectedDevice}
            handleSearchInput={handleSearchInput}
            deviceCount={renderedDevices.length}
          />
          <div className={styles.devicesScrollArea}>
            {isGridView ? (
              <DeviceGrid
                devices={renderedDevices}
                setSelectedDevice={setSelectedDevice}
              ></DeviceGrid>
            ) : (
              <DeviceTable
                devices={renderedDevices}
                setSelectedDevice={setSelectedDevice}
              ></DeviceTable>
            )}
          </div>
        </>
      )}
    </div>
  );
}
