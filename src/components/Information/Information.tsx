

export default function Information({title, description}: {title: string|undefined, description: string}) {
    return (<div className="information">
        {title && (<span style={{width: "15%", display: "inline-block", fontWeight: 'bold'}}>{title}</span>)}
        <span>{description}</span>
    </div>)
}