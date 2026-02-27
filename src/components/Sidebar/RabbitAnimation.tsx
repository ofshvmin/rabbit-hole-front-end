import rabbitImg from '../../assets/RabbitHole.png'
import styles from './Sidebar.module.css'

const RabbitAnimation = () => (
  <div className={styles.rabbitMover}>
    {/* Pose 1: Hunched sitting */}
    <svg className={`${styles.rabbitPose} ${styles.pose1}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rg1" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#F44336" />
          <stop offset="40%" stopColor="#FF7043" />
          <stop offset="70%" stopColor="#FF9800" />
          <stop offset="100%" stopColor="#FFC107" />
        </linearGradient>
      </defs>
      <path fill="url(#rg1)" d="
        M78,56 C76,50 72,44 68,40
        C64,36 60,30 58,22
        C57,16 56,8 55,4
        C54,0 52,2 52,8
        C52,14 53,20 54,24
        C52,18 50,10 48,6
        C46,2 44,4 44,10
        C44,16 46,24 48,30
        C44,32 38,38 32,46
        C26,54 22,62 20,68
        C18,66 16,62 18,58
        C18,62 18,68 20,72
        C24,78 30,84 38,86
        C48,88 58,86 64,82
        C70,78 74,72 76,64
        C78,60 78,58 78,56Z
      "/>
    </svg>

    {/* Pose 2: Alert sitting */}
    <svg className={`${styles.rabbitPose} ${styles.pose2}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rg2" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#F44336" />
          <stop offset="40%" stopColor="#FF7043" />
          <stop offset="70%" stopColor="#FF9800" />
          <stop offset="100%" stopColor="#FFC107" />
        </linearGradient>
      </defs>
      <path fill="url(#rg2)" d="
        M72,48 C70,42 66,36 62,30
        C58,24 56,16 55,10
        C54,4 53,0 52,2
        C51,6 52,14 52,20
        C50,12 48,4 47,0
        C46,-4 44,-2 44,4
        C44,12 46,22 48,28
        C42,30 36,36 30,46
        C24,56 22,64 22,70
        C20,66 18,60 18,58
        C18,64 20,72 24,78
        C28,84 36,90 46,90
        C56,90 64,86 68,78
        C72,70 74,60 72,48Z
      "/>
    </svg>

    {/* Pose 3: Crouching / wind-up */}
    <svg className={`${styles.rabbitPose} ${styles.pose3}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rg3" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#F44336" />
          <stop offset="40%" stopColor="#FF7043" />
          <stop offset="70%" stopColor="#FF9800" />
          <stop offset="100%" stopColor="#FFC107" />
        </linearGradient>
      </defs>
      <path fill="url(#rg3)" d="
        M80,54 C78,48 74,42 70,38
        C66,34 62,28 60,22
        C59,16 58,10 57,8
        C56,4 54,6 55,10
        C56,16 57,22 58,26
        C56,18 54,12 52,8
        C50,4 48,6 49,12
        C50,18 52,24 54,28
        C48,30 40,36 32,44
        C24,52 18,60 16,66
        C14,62 12,58 12,56
        C12,62 14,70 20,76
        C26,82 36,86 48,86
        C60,86 70,82 76,74
        C80,68 82,60 80,54Z
      "/>
    </svg>

    {/* Pose 4: Standing on hind legs */}
    <svg className={`${styles.rabbitPose} ${styles.pose4}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rg4" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#F44336" />
          <stop offset="40%" stopColor="#FF7043" />
          <stop offset="70%" stopColor="#FF9800" />
          <stop offset="100%" stopColor="#FFC107" />
        </linearGradient>
      </defs>
      <path fill="url(#rg4)" d="
        M64,42 C62,36 58,28 56,22
        C54,14 53,6 52,0
        C51,-4 49,-4 49,0
        C49,6 50,14 51,20
        C50,12 48,4 47,0
        C46,-4 44,-2 44,2
        C44,8 46,18 48,24
        C42,28 38,36 36,46
        C32,56 30,68 30,78
        C30,84 34,90 42,92
        C50,94 58,92 64,86
        C68,80 68,68 66,56
        C64,48 64,44 64,42Z
      "/>
    </svg>

    {/* Pose 5: Mid-leap (PNG, slight upward angle) */}
    <img
      src={rabbitImg}
      alt=""
      className={`${styles.rabbitPose} ${styles.pose5} ${styles.poseImg}`}
      style={{ transform: 'rotate(-15deg)' }}
    />

    {/* Pose 6: Full stretch leap (PNG, natural horizontal) */}
    <img
      src={rabbitImg}
      alt=""
      className={`${styles.rabbitPose} ${styles.pose6} ${styles.poseImg}`}
    />

    {/* Pose 7: Nose-dive (PNG, angled down) */}
    <img
      src={rabbitImg}
      alt=""
      className={`${styles.rabbitPose} ${styles.pose7} ${styles.poseImg}`}
      style={{ transform: 'rotate(45deg)' }}
    />
  </div>
)

export default RabbitAnimation
