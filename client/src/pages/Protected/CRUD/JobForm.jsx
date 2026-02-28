import React from 'react';

const JobForm = ({
  register,
  errors,
  handleSubmit,
  buttonLabel,
  handleChangeFile,
  handleRemoveImage,
  imageUrl,
}) => {
  return (
    <div className="job-form-component">
      <form onSubmit={handleSubmit}>

        {/* TÍTULO */}
        <input
          type="text"
          placeholder="Titulo de trabajo"
          {...register('title')}
        />
        {errors.title && <span className="error">{errors.title.message}</span>}

        {/* EMPRESA */}
        <input
          type="text"
          placeholder="Empresa"
          {...register('company')}
        />
        {errors.company && <span className="error">{errors.company.message}</span>}

        {/* UBICACIÓN */}
        <input
          type="text"
          placeholder="Ubicación"
          {...register('locationTerm')}
        />
        {errors.locationTerm && (
          <span className="error">{errors.locationTerm.message}</span>
        )}

        {/* CATEGORÍA */}
        <input
          type="text"
          placeholder="Palabra Clave, Categoria, Trabajo relacionado, etc"
          {...register('category')}
        />
        {errors.category && <span className="error">{errors.category.message}</span>}

        {/* CÓDIGO */}
        <input
          type="text"
          placeholder="Codigo de Referencia en Email"
          {...register('applicationCode')}
        />

        {/* TIPO DE EMPLEO */}
        <select {...register('employmentType')}>
          <option value="">-</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
        {errors.employmentType && (
          <span className="error">{errors.employmentType.message}</span>
        )}

        {/* MODALIDAD */}
        <select {...register('employmentStyle')}>
          <option value="">-</option>
          <option value="Presencial">Presencial</option>
          <option value="Remoto">Remoto</option>
          <option value="Hibrida">Híbrida</option>
        </select>

        {/* DESCRIPCIÓN */}
        <textarea
          placeholder="Descripción"
          {...register('description')}
        />
        {errors.description && (
          <span className="error">{errors.description.message}</span>
        )}

        {/* SUELDO */}
        <input
          type="text"
          placeholder="Rango de sueldo"
          {...register('salaryRange')}
        />
        {errors.salaryRange && (
          <span className="error">{errors.salaryRange.message}</span>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email de contacto"
          {...register('contactEmail')}
        />
        {errors.contactEmail && (
          <span className="error">{errors.contactEmail.message}</span>
        )}

        {/* LINKEDIN */}
        <input
          type="url"
          placeholder="LinkedIn Link"
          {...register('linkedinLink')}
        />
        {errors.linkedinLink && (
          <span className="error">{errors.linkedinLink.message}</span>
        )}

        {/* IMAGEN */}
        {imageUrl ? (
          <div className="image-preview">
            <img
              src={imageUrl}
              alt="Imagen del trabajo"
              style={{ width: '200px', display: 'block', marginBottom: '10px' }}
            />
            <button type="button" onClick={handleRemoveImage}>
              Borrar imagen
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeFile}
          />
        )}

        {/* SUBMIT */}
        <button type="submit" className="submit-btn">
          {buttonLabel}
        </button>
      </form>
    </div>
  );
};

export default JobForm;