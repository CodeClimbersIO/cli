import fs from 'fs/promises'
import path from 'path'
import {
  createIniFile,
  IniConfig,
  parseIni,
  readIniFile,
  removeIniFile,
  stringifyIni,
} from '../ini.util'
import { HOME_DIR } from '../node.util'
import { existsSync } from 'fs'

const test_file_path = '.codeclimbers.test.cfg'

describe('parseIni', () => {
  it('should parse a valid INI string with one section', () => {
    const input = `
      [section1]
      key1 = value1
      key2 = value2
    `
    const expected: IniConfig = {
      section1: {
        key1: 'value1',
        key2: 'value2',
      },
    }
    expect(parseIni(input)).toEqual(expected)
  })

  it('should parse a valid INI string with multiple sections', () => {
    const input = `
      [section1]
      key1 = value1
      key2 = value2

      [section2]
      key3 = value3
      key4 = value4
    `
    const expected: IniConfig = {
      section1: {
        key1: 'value1',
        key2: 'value2',
      },
      section2: {
        key3: 'value3',
        key4: 'value4',
      },
    }
    expect(parseIni(input)).toEqual(expected)
  })

  it('should handle empty input', () => {
    const input = ''
    const expected: IniConfig = {}
    expect(parseIni(input)).toEqual(expected)
  })

  it('should handle input with only whitespace', () => {
    const input = '   \n  \t  '
    const expected: IniConfig = {}
    expect(parseIni(input)).toEqual(expected)
  })

  it('should ignore lines without a section', () => {
    const input = `
      key1 = value1
      [section1]
      key2 = value2
    `
    const expected: IniConfig = {
      section1: {
        key2: 'value2',
      },
    }
    expect(parseIni(input)).toEqual(expected)
  })

  it('should handle malformed lines within a section', () => {
    const input = `
      [section1]
      key1 = value1
      malformed line
      key2 = value2
    `
    const expected: IniConfig = {
      section1: {
        key1: 'value1',
        key2: 'value2',
      },
    }
    expect(parseIni(input)).toEqual(expected)
  })

  it('should handle keys without values', () => {
    const input = `
      [section1]
      key1 = value1
      key2 =
      key3 = value3
    `
    const expected: IniConfig = {
      section1: {
        key1: 'value1',
        key3: 'value3',
      },
    }
    expect(parseIni(input)).toEqual(expected)
  })

  it('should handle section names with spaces', () => {
    const input = `
      [Section One]
      key1 = value1
      [Section Two]
      key2 = value2
    `
    const expected: IniConfig = {
      'Section One': {
        key1: 'value1',
      },
      'Section Two': {
        key2: 'value2',
      },
    }
    expect(parseIni(input)).toEqual(expected)
  })
})

describe('stringifyIni', () => {
  it('should return an empty string for empty input', () => {
    const input: IniConfig = {}
    const expected = '\n'
    expect(stringifyIni(input)).toBe(expected)
  })

  it('should correctly stringify a single section with multiple entries', () => {
    const input: IniConfig = {
      section1: {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      },
    }
    const expected = `[section1]
key1 = value1
key2 = value2
key3 = value3\n`
    expect(stringifyIni(input)).toBe(expected)
  })

  it('should correctly stringify multiple sections with multiple entries', () => {
    const input: IniConfig = {
      section1: {
        key1: 'value1',
        key2: 'value2',
      },
      section2: {
        key3: 'value3',
        key4: 'value4',
      },
    }
    const expected = `[section1]
key1 = value1
key2 = value2

[section2]
key3 = value3
key4 = value4\n`
    expect(stringifyIni(input)).toBe(expected)
  })

  it('should handle sections with no entries', () => {
    const input: IniConfig = {
      section1: {},
      section2: {
        key1: 'value1',
      },
      section3: {},
    }
    const expected = `[section1]


[section2]
key1 = value1

[section3]
\n`
    expect(stringifyIni(input)).toBe(expected)
  })

  it('should handle a mix of sections with and without entries', () => {
    const input: IniConfig = {
      section1: {
        key1: 'value1',
      },
      section2: {},
      section3: {
        key2: 'value2',
        key3: 'value3',
      },
      section4: {},
    }

    const expected = `[section1]
key1 = value1

[section2]


[section3]
key2 = value2
key3 = value3

[section4]
\n`
    expect(stringifyIni(input)).toBe(expected)
  })

  it('should handle values containing spaces', () => {
    const input: IniConfig = {
      section1: {
        key1: 'value with spaces',
        key2: 'another value with spaces',
      },
    }
    const expected = `[section1]
key1 = value with spaces
key2 = another value with spaces\n`
    expect(stringifyIni(input)).toBe(expected)
  })
})

describe('createIniFile', () => {
  beforeEach(async () => {
    const filePath = path.join(HOME_DIR, test_file_path)
    if (existsSync(filePath)) {
      await removeIniFile(filePath)
    }
  })
  it('should create a new ini file', async () => {
    const filePath = path.join(HOME_DIR, test_file_path)
    await createIniFile(filePath, { settings: {} })
    const iniContent = await fs.readFile(filePath, 'utf8')
    expect(iniContent).toBeDefined()
  })
})

describe('readIniFile', () => {
  it('should read an ini file', async () => {
    const filePath = path.join(HOME_DIR, test_file_path)
    await createIniFile(filePath, { settings: {} })
    const iniContent = await readIniFile(filePath)
    expect(iniContent).toBeDefined()
  })
})

describe('removeIniFile', () => {
  it('should remove an ini file', async () => {
    const filePath = path.join(HOME_DIR, test_file_path)
    await createIniFile(filePath, { settings: {} })
    await removeIniFile(filePath)
    await expect(async () => {
      await fs.readFile(filePath, 'utf8')
    }).rejects.toThrow('ENOENT')
  })
})
