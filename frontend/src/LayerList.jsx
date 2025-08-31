export default function LayerList({ layers }) {
  return (
    <div>
      <h3>Layer List</h3>
      <ul>
        {layers.map((l,i)=> <li key={i}>{l.type}</li>)}
      </ul>
    </div>
  )
}
