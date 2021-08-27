import Select from 'react-select'
// import SearchIcon from '../SearchIcon'
import './index.css'

const MySelect = props => {
  const {selected, onChange, options} = props
  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #161625',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #161625',
      },
      borderRadius: '8px',
      height: '72px',
      backgroundColor: '#2F2F43',
    }),
    singleValue: base => ({...base, color: '#94A3B8'}),
    valueContainer: base => ({
      ...base,
      background: '#2F2F43',
      color: '#c920bb',
      width: '100%',
      //   backgroundColor: '#0000',
    }),

    menu: (provided, state) => ({
      ...provided,

      color: '#c920bb',
      padding: 20,
      backgroundColor: '#161625',
    }),

    option: (provided, state) => ({
      ...provided,

      borderBottom: '1px solid #64748B',
      '&:hover': {
        border: '1px solid #94A3B8',
      },
      color: '#64748B',
      padding: 10,
      backgroundColor: '#161625',
    }),
  }
  return (
    <Select
      styles={customStyles}
      value={selected}
      onChange={onChange}
      options={options}
      className="size"
      placeholder="Enter the State"
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
    />
  )
}

export default MySelect
