import clsx from 'clsx';
import styles from './DetailView.module.scss';
import { DeviceType } from 'types/global';
import { Dispatch, SetStateAction, useState } from 'react';

interface DetailViewProps {
  device: DeviceType;
  setSelectedDevice: Dispatch<SetStateAction<DeviceType | undefined>>;
  previousDevice: Function;
  nextDevice: Function;
}

export default function DetailView({
  device,
  setSelectedDevice,
  previousDevice,
  nextDevice,
}: DetailViewProps) {
  const [isJSONShowing, setIsJSONShowing] = useState<boolean>(false);
  const {
    icon,
    icon: { resolutions } = {},
    product,
    line,
    shortnames,
  } = device;
  const highestRes = resolutions ? resolutions[resolutions.length - 1] : [0, 0];

  const imageUrl =
    resolutions && icon
      ? `https://static.ui.com/fingerprint/ui/icons/${icon.id}_${highestRes[0]}x${highestRes[1]}.png`
      : '';

  return (
    <div className={styles.detailView}>
      <div className={styles.detailViewHeader}>
        <button
          className={clsx(styles.headerButton, styles.backButton)}
          onClick={() => {
            setSelectedDevice(undefined);
          }}
        >
          Back
        </button>

        <div className={styles.arrowButtons}>
          <button
            className={clsx(styles.headerButton, styles.arrowButton)}
            onClick={() => {
              previousDevice();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="12"
              fill="none"
            >
              <path
                fill="#838691"
                d="M5.5 12a.501.501 0 0 1-.364-.157L.287 6.701A.994.994 0 0 1 0 6c0-.264.102-.513.287-.701L5.136.157a.5.5 0 0 1 .728.686L1 6l.01.01 4.854 5.146A.5.5 0 0 1 5.5 12Z"
              />
            </svg>
          </button>
          <button
            className={clsx(styles.headerButton, styles.arrowButton)}
            onClick={() => {
              nextDevice();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="12"
              fill="none"
            >
              <path
                fill="#838691"
                d="M.5 12a.501.501 0 0 0 .364-.157l4.849-5.142A.994.994 0 0 0 6 6a.994.994 0 0 0-.287-.701L.864.157a.5.5 0 0 0-.728.686L5 6l-.01.01-4.854 5.146A.5.5 0 0 0 .5 12Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.detailViewContent}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={imageUrl} />
        </div>
        <div className={styles.deviceDetails}>
          <h2>{product?.name}</h2>
          <h3>{line?.name}</h3>
          <ul>
            <li>
              Product Line <span>{line?.name}</span>
            </li>
            <li>
              ID <span>{line?.id}</span>
            </li>
            <li>
              Name <span>{product?.name}</span>
            </li>
            <li>
              Short Name <span>{shortnames?.join(', ')}</span>
            </li>
            <li>
              Max. Power <span>---</span>
            </li>
            <li>
              Speed <span>---</span>
            </li>
            <li>
              Number of Ports <span>---</span>
            </li>
          </ul>
          <button
            className={styles.jsonToggleButton}
            onClick={() => {
              setIsJSONShowing(!isJSONShowing);
            }}
          >
            See All Details as JSON
          </button>
          {isJSONShowing && (
            <pre className={styles.jsonBlock}>
              {JSON.stringify(device, null, 4)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
