export default function ShapeGraph({ shapes }) {
  return (
    <div>
      <h3>Shapes</h3>
      <ul>
        {shapes.map((s,i)=> <li key={i}>{`(${s.join(", ")})`}</li>)}
      </ul>
    </div>
  )
}
