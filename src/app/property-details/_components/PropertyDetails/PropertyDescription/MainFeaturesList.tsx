import {
  Car,
  Cctv,
  HeaterIcon as Radiator,
  Trees,
  Wind,
  Zap,
} from 'lucide-react'
import styles from './styles.module.css'

const getMainFeatureIcon = (feature: string) => {
  switch (feature) {
    case 'Security Cameras':
      return <Cctv className={styles.list_icon} />
    case 'Parking Space':
      return <Car className={styles.list_icon} />
    case 'Central Heating':
      return <Radiator className={styles.list_icon} />
    case 'Central Air Conditioning':
      return <Wind className={styles.list_icon} />
    case 'Electricity Backup':
      return <Zap className={styles.list_icon} />
    case 'Lawn / Garden':
      return <Trees className={styles.list_icon} />
    default:
      return <Cctv className={styles.list_icon} />
  }
}

export default function MainFeaturesList({ List }: { List: string[] }) {
  return (
    <>
      {List.map((feature) => (
        <div key={feature} className={styles.feature_wrapper}>
          {getMainFeatureIcon(feature)}
          <p className={styles.feature_text}>{feature}</p>
        </div>
      ))}
    </>
  )
}
