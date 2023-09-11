import styles from './DeviceGridTable.module.scss';
import { DeviceType, DevicesType } from 'types/global';

interface DeviceTableProps {
  devices: DevicesType;
  setSelectedDevice: React.Dispatch<
    React.SetStateAction<DeviceType | undefined>
  >;
}

export default function DeviceTable({
  devices,
  setSelectedDevice,
}: DeviceTableProps) {
  const getImageUrl = (device: DeviceType) => {
    if (!device) return '';

    const { icon, icon: { resolutions } = {} } = device;

    return resolutions && icon
      ? `https://static.ui.com/fingerprint/ui/icons/${icon.id}_${resolutions[0][0]}x${resolutions[0][1]}.png`
      : '';
  };

  return (
    <div className={styles.deviceTableWrapper}>
      <table className={styles.deviceTable}>
        <thead className={styles.deviceTableHead}>
          <tr className={styles.tableHeadRow}>
            <th>Product Line</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr aria-hidden="true" className={styles.tableBodyRowSpacer}></tr>
          {devices.map((device: DeviceType, index) => (
            <tr
              key={device.id}
              tabIndex={0}
              className={styles.tableBodyRow}
              onClick={() => setSelectedDevice(device)}
            >
              <td>
                <div className={styles.tableBodyRowContent}>
                  <img src={getImageUrl(device)} />
                  {device.line?.name}
                </div>
              </td>
              <td>{device.product?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
