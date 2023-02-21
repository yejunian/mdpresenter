import { ask } from '@tauri-apps/api/dialog'
import { emit } from '@tauri-apps/api/event'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import { Config, configContents, baseConfig } from '../core/Config'
import { appName } from '../core/constants'
import useConfig from '../hooks/useConfig'

function Settings() {
  const { config, updateConfigFile } = useConfig()

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    emit('settings:load')
  }, [])

  const handleResetClick = async () => {
    if (
      await ask('설정을 초기화할까요?', {
        title: `설정 - ${appName}`,
        type: 'warning',
      })
    ) {
      updateConfigFile(baseConfig)
    }
  }

  const handleApplyClick = () => {
    const form = formRef.current

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const updatedConfig: Partial<Config> = {}

    for (const key of Object.keys(baseConfig)) {
      if (!form[key]) {
        continue
      }

      const input: HTMLInputElement = form[key]

      switch (input.type) {
        case 'checkbox':
          updatedConfig[key] = input.checked
          break

        default:
          updatedConfig[key] = input.value
          break
      }
    }

    updateConfigFile(updatedConfig)
  }

  return (
    <div>
      <header
        className={clsx(
          'sticky -top-3',
          'grid grid-cols-4 items-center gap-x-6 gap-y-3',
          'p-6 pb-0 bg-zinc-800',
          'bg-opacity-60 backdrop-blur-sm'
        )}
      >
        <h1 className="col-span-2 leading-none text-lg font-medium">설정</h1>
        <button
          type="button"
          className={clsx(
            'block border border-zinc-600 hover:border-red-800 rounded',
            'p-1 bg-zinc-800',
            'text-sm font-medium text-zinc-300'
          )}
          onClick={handleResetClick}
        >
          초기화
        </button>
        <button
          type="button"
          className={clsx(
            'block rounded p-1 bg-blue-600',
            'text-sm font-bold text-white'
          )}
          onClick={handleApplyClick}
        >
          적용
        </button>

        <hr
          className={clsx(
            'col-span-full border-t-2 border-t-zinc-600 w-full',
            'shadow-sm shadow-zinc-900'
          )}
        />
      </header>

      <form ref={formRef} className="p-6 space-y-12">
        {configContents.map((section, index) => (
          <section key={index}>
            <h2 className="text-2xl font-normal text-zinc-200">
              {section.title}
            </h2>

            {section.description ? (
              <p className="text-xs font-medium text-zinc-400">
                {section.description}
              </p>
            ) : null}

            <dl className="mt-6 space-y-6">
              {section.contents.map((entry) => {
                const type = typeof baseConfig[entry.key]

                return (
                  <div
                    key={entry.key}
                    className={clsx(
                      'grid grid-cols-4 gap-x-6 gap-y-1',
                      'text-xs font-medium'
                    )}
                  >
                    <dt className="leading-4 text-sm text-zinc-300">
                      <div>{entry.name}</div>
                      {entry.domain ? (
                        <div
                          className={clsx(
                            'text-xs font-semibold text-zinc-500',
                            'ex-high-legibility'
                          )}
                        >
                          {entry.domain.join(' | ')}
                        </div>
                      ) : null}
                    </dt>

                    <dd
                      className={clsx(
                        'col-span-3 flex flex-col gap-1',
                        'leading-4 text-zinc-400'
                      )}
                    >
                      <label
                        className={clsx(
                          'flex leading-none text-sm text-zinc-300',
                          'cursor-pointer ex-high-legibility'
                        )}
                      >
                        {type === 'boolean' ? (
                          <>
                            <input
                              type="checkbox"
                              className="block cursor-pointer"
                              name={entry.key}
                              defaultChecked={
                                config[entry.key] ?? baseConfig[entry.key]
                              }
                            />
                            <div className="ml-2">활성화</div>
                          </>
                        ) : (
                          <input
                            type="text"
                            className={clsx(
                              'block border border-zinc-500 rounded',
                              'px-2 py-1 w-full bg-transparent cursor-auto'
                            )}
                            name={entry.key}
                            defaultValue={
                              config[entry.key] ?? baseConfig[entry.key]
                            }
                          />
                        )}
                      </label>
                      {entry.description?.trim() ? (
                        <div className="leading-4 font-medium">
                          {entry.description}
                        </div>
                      ) : null}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </section>
        ))}
      </form>
    </div>
  )
}

export default Settings
