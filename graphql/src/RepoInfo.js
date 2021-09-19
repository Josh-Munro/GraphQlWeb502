const RepoInfo = ({repo}) => {
    return (
          <li key={repo.id.toString()}>
               <a href={repo.url}>
                 {repo.name}
               </a>
               <p>{repo.description}</p>
             </li>
    )
}

export default RepoInfo;