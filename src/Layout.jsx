import QueryRepoContent from './QueryRepoContent'
import React from 'react'

import {cx} from 'emotion'
import {marginAuto} from './styled'
import {useInputValue} from './useInputValue'

function RepositorySettings({className}) {
  const [owner] = useInputValue('')
  const [repo] = useInputValue('')
  const [file] = useInputValue('')
  return (
    <div className={cx('bg-white shadow-2 pa4', className)}>
      <div>
        <input {...owner} type="text" />
      </div>
      <div>
        <input {...repo} type="text" />
      </div>
      <div>
        <input {...file} type="text" />
      </div>
    </div>
  )
}

function Layout() {
  return (
    <div className="h-100 flex flex-auto flex-column">
      <div className={marginAuto}>
        <RepositorySettings className="ma3" />
        <QueryRepoContent className="ma3" />
      </div>
    </div>
  )
}

export default Layout
