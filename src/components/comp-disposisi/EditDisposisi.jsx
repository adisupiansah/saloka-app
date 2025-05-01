import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2'

const EditDisposisi = ({ data }) => {
  const [formData, setFormData] = useState({
    tgl_surat: '',
    no_disposisi: '',
    no_surat: '',
    perihal: '',
    satfung: '',
    type_disposisi: '',
  })

  useEffect(() => {
    if (data ) {
      setFormData({
        tgl_surat: data.tgl_surat || '',
        no_disposisi: data.no_disposisi || '',
        no_surat: data.no_surat || '',
        perihal: data.perihal || '',
        satfung: data.satfung || '',
        type_disposisi: data.type_disposisi || '',
      })
    }

  }, [data])

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/v1/disposisi/edit', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id: data.id, ...formData }),
      })

      const result = await response.json()
      if(!response.ok) {
        throw new Error(result.message)
      }

      Swal.fire({
        title: "Update Berhasil",
        text: "Data berhasil diedit",
        icon: "success",
        confirmButtonText: "Yes",
        confirmButtonColor: "#72bf78",
        color: '#D9D9D9',
        background: '#212529',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    } catch (error) {
      console.error('Error saat edit data:', error);
      Swal.fire('Error', 'Gagal mengedit data euy', 'error');
      
    }
  } 
  
  
  return (
    <div className='form-editdisposisi'>
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <label className="form-label">Tanggal surat</label>
          <input
            type="date"
            className="form-control"
            name="tgl_surat"
            value={formData.tgl_surat}
            onChange={handleEditChange}
          />
        </div>

        <div className="mt-3">
          <label className="form-label">Nomor disposisi</label>
          <input
            type="text"
            className="form-control"
            name="no_disposisi"
            value={formData.no_disposisi}
            onChange={handleEditChange}
          />
        </div>
        <div className="mt-3">
          <label className="form-label">Nomor surat</label>
          <input
            type="text"
            className="form-control"
            name="no_surat"
            value={formData.no_surat}
            onChange={handleEditChange}
          />
        </div>
        <div className="mt-3">
          <label className="form-label">Perihal</label>
          <input
            type="text"
            className="form-control"
            name="perihal"
            value={formData.perihal}
            onChange={handleEditChange}
          />
        </div>
        <div className="mt-3">
          <label className="form-label">Satfung</label>
          <input
            type="text"
            className="form-control"
            name="satfung"
            value={formData.satfung}
            onChange={handleEditChange}
          />
        </div>

        <div className="mt-3">
          <label className="form-label">Type disposisi</label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="type_disposisi"
            value={formData.type_disposisi}
            onChange={handleEditChange}
          >
            <option value="">Pilih Type Disposisi</option>
            <option value="disposisi biasa">disposisi biasa</option>
            <option value="disposisi BMP">disposisi BMP</option>
            <option value="disposisi Harwat">disposisi Harwat</option>
          </select>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-3">
          <button className='btn btn-editdisposisi col-md-6' type='submit'>simpan</button>
        </div>
      </form>
    </div>
  )
}

export default EditDisposisi
