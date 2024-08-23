import './index.css'

const SkillItem = props => {
  const {skill} = props
  const {imageUrl, name} = skill

  return (
    <li className="skill-item flex">
      <img src={imageUrl} alt={name} className="skill-img" />
      <h3 className="description skill-name">{name}</h3>
    </li>
  )
}

export default SkillItem
