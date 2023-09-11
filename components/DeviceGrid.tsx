import clsx from 'clsx';
import styles from './DeviceGridTable.module.scss';
import { DeviceType, DevicesType } from 'types/global';

interface DeviceGridProps {
  devices: DevicesType;
  setSelectedDevice: React.Dispatch<
    React.SetStateAction<DeviceType | undefined>
  >;
}

interface DeviceProps {
  device: DeviceType;
  setSelectedDevice: React.Dispatch<
    React.SetStateAction<DeviceType | undefined>
  >;
}

const findClosestMatch = (
  target: number,
  arr?: [number, number][]
): [number, number] | null => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }

  let closest = 0;

  for (let i = 0; i < arr.length; i++) {
    const diff = target - arr[i][0];

    if (diff >= 0 && diff < target - closest) {
      closest = i;
    }
  }

  return arr[closest];
};

function Device({ device, setSelectedDevice }: DeviceProps) {
  const {
    icon,
    icon: { resolutions } = {},
    product,
    line,
    shortnames = [],
  } = device;
  const targetResolution = 257;

  const closestMatchingResolution = findClosestMatch(
    targetResolution,
    resolutions
  );

  const imageUrl =
    closestMatchingResolution && icon
      ? `https://static.ui.com/fingerprint/ui/icons/${icon.id}_${closestMatchingResolution[0]}x${closestMatchingResolution[1]}.png`
      : '';

  return (
    <button
      className={clsx(styles.deviceItem, styles.deviceGridItem)}
      onClick={() => {
        setSelectedDevice(device);
      }}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageUrl} />
        <span className={styles.lineName}>{line?.name}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.deviceName}>{product?.name}</h3>
        <div className={styles.contentCode}>{shortnames[0]}</div>
      </div>
    </button>
  );
}

export default function DeviceGrid({
  devices,
  setSelectedDevice,
}: DeviceGridProps) {
  return (
    <ul className={clsx(styles.deviceList, styles.deviceListGrid)}>
      {devices.map((device: DeviceType) => (
        <li
          className={clsx(styles.deviceItem, styles.deviceGridItem)}
          key={device.id}
        >
          <Device
            device={device}
            setSelectedDevice={setSelectedDevice}
          ></Device>
        </li>
      ))}
    </ul>
  );
}
