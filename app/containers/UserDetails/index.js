import { Loading } from '@/components';
import { getReq, postReq } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isYupError, parseYupError } from '@/utils/Yup';
import toast from 'react-hot-toast';
import { validateData, validateForm } from '@/utils/validation';
const UserDetails = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});

  // Login API Calling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({ ...formError, [name]: '' });
  };
  const handleSubmit = async (e) => {
    console.log('clickedd');
    e.preventDefault();

    try {
      setIsLoading(true);

      const [, ValidationErr] = await validateData(validateForm, form);
      if (ValidationErr) {
        setFormError(ValidationErr);
        return;
      }

      console.log(form);
      const res = await postReq(`/user/admin/user-meta/${id}`, form);
      const { status, error, data } = res;

      if (status) {
        toast.success(data.message);
      } else if (error) {
        Array.isArray(error.message)
          ? error?.message.map((msg) => toast.error(msg))
          : toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    setLoading(true);
    try {
      const res = await getReq(`/user/users/${id}`);
      const { data, status, error } = res;

      console.log(res, ' res of users');
      if (status) {
        console.log(data[0], 'dddddd');
        setForm(data[0]);
      } else {
        if (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getUserData();
    /*  eslint-disable */
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container ">
          <div className="flex items-center gap-5 mt-14 mb-5">
            <button
              className=" text-black font-medium p-3 rounded-full text-14 bg-primary-1200 font-comfortaa "
              onClick={() => navigate(-1)}
            >
              {reactIcons.arrowLeft}
            </button>
            <h3 className="text-24 font-medium">User Detail</h3>
          </div>
          <form className="w-full">
            <div className="flex flex-col md:grid grid-cols-2 md:gap-x-5">
              <div className="input-div w-full">
                <label className="input-label" htmlFor="businessName">
                  Business Name
                </label>
                <input
                  className="input-box"
                  type="text"
                  value={form?.businessName}
                  id="businessName"
                  placeholder="Enter Business name "
                  name="businessName"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.businessName && (
                    <div className="form-eror">{formError.businessName}</div>
                  )}
                </div>
              </div>

              <div className="input-div">
                <label className="input-label" htmlFor="address">
                  Address
                </label>
                <input
                  className="input-box"
                  type="text"
                  value={form?.address}
                  id="address"
                  placeholder="Enter Address"
                  name="address"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.address && (
                    <div className="form-eror">{formError.address}</div>
                  )}
                </div>
              </div>

              <div className="input-div">
                <label className="input-label" htmlFor="city">
                  City
                </label>
                <input
                  className="input-box"
                  type="text"
                  value={form?.city}
                  id="city"
                  placeholder="Enter city"
                  name="city"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.city && (
                    <div className="form-eror">{formError.city}</div>
                  )}
                </div>
              </div>
              <div className="input-div">
                <label className="input-label" htmlFor="state">
                  State
                </label>
                <input
                  className="input-box"
                  type="text"
                  value={form?.state}
                  id="state"
                  placeholder="Enter state"
                  name="state"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.state && (
                    <div className="form-eror">{formError.state}</div>
                  )}
                </div>
              </div>
              <div className="input-div">
                <label className="input-label" htmlFor="pinCode">
                  Pin Code
                </label>
                <input
                  className="input-box"
                  type="text"
                  value={form?.pinCode}
                  id="pinCode"
                  placeholder="Enter your Relative Number"
                  name="pinCode"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.pinCode && (
                    <div className="form-eror">{formError.pinCode}</div>
                  )}
                </div>
              </div>
              <div className="input-div">
                <label className="input-label" htmlFor="whatsappNumber">
                  Whatsapp Number
                </label>
                <input
                  className="input-box"
                  type="text"
                  value={form?.whatsappNumber}
                  id="whatsappNumber"
                  placeholder="Enter whatsapp Number"
                  name="whatsappNumber"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.whatsappNumber && (
                    <div className="form-eror">{formError.whatsappNumber}</div>
                  )}
                </div>
              </div>
              <div className="input-div">
                <label className="input-label" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  className="input-box"
                  type="text"
                  value={form?.phoneNumber}
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  name="phoneNumber"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.phoneNumber && (
                    <div className="form-eror">{formError.phoneNumber}</div>
                  )}
                </div>
              </div>
              <div className="input-div">
                <label className="input-label" htmlFor="gstNumber">
                  GST Number
                </label>
                <input
                  className="input-box"
                  type="text"
                  value={form?.gstNumber}
                  id="gstNumber"
                  placeholder="Enter gst number"
                  name="gstNumber"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.gstNumber && (
                    <div className="form-eror">{formError.gstNumber}</div>
                  )}
                </div>
              </div>

              <div className="input-div">
                <label className="input-label" htmlFor="yearOfEstablishment">
                  Year Of Establishment
                </label>
                <input
                  className="input-box"
                  type="text"
                  value={form?.yearOfEstablishment}
                  id="yearOfEstablishment"
                  placeholder="Enter year of establishment"
                  name="yearOfEstablishment"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.yearOfEstablishment && (
                    <div className="form-eror">
                      {formError.yearOfEstablishment}
                    </div>
                  )}
                </div>
              </div>

              <div className="input-div">
                <label className="input-label" htmlFor="rating">
                  Rating
                </label>
                <input
                  className="input-box"
                  type="text"
                  value={form?.rating}
                  id="rating"
                  placeholder="Enter rating"
                  name="rating"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.rating && (
                    <div className="form-eror">{formError.rating}</div>
                  )}
                </div>
              </div>

              <div className="input-div">
                <label className="input-label" htmlFor="sourcesLink">
                  Sources Link
                </label>
                <input
                  className="input-box"
                  type="text"
                  value={form?.sourcesLink}
                  id="sourcesLink"
                  placeholder="Enter link"
                  name="sourcesLink"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.sourcesLink && (
                    <div className="form-eror">{formError.sourcesLink}</div>
                  )}
                </div>
              </div>
              <div className="input-div">
                <label className="input-label" htmlFor="sourcesPlatform">
                  Sources Platform
                </label>
                <input
                  className="input-box"
                  type="text"
                  value={form?.sourcesPlatform}
                  id="sourcesPlatform"
                  placeholder="Enter Sources Platform"
                  name="sourcesPlatform"
                  onChange={handleChange}
                />
                <div className="error">
                  {formError.sourcesPlatform && (
                    <div className="form-eror">{formError.sourcesPlatform}</div>
                  )}
                </div>
              </div>
              <div className="input-div w-full">
                <label className="input-label" htmlFor="employeeId">
                  Employee Id
                </label>
                <input
                  className="input-box"
                  type="text"
                  id="employeeId"
                  placeholder="Enter Employee Id "
                  name="employeeId"
                  onChange={handleChange}
                  value={form?.employeeId}
                />
                <div className="error">
                  {formError.employeeId && (
                    <div className="form-eror">{formError.employeeId}</div>
                  )}
                </div>
              </div>
              <div className="input-div w-full">
                <label className="input-label" htmlFor="employeeName">
                  Employee Name
                </label>
                <input
                  className="input-box"
                  type="text"
                  id="employeeName"
                  placeholder="Enter Employee Name "
                  name="employeeName"
                  onChange={handleChange}
                  value={form?.employeeName}
                />
                <div className="error">
                  {formError.employeeName && (
                    <div className="form-eror">{formError.employeeName}</div>
                  )}
                </div>
              </div>
              <div className="input-div w-full">
                <label className="input-label" htmlFor="employeeMobileNumber">
                  Employee Mobile Number
                </label>
                <input
                  className="input-box"
                  type="text"
                  id="employeeMobileNumber"
                  placeholder="Enter Employee Mobile Number "
                  name="employeeMobileNumber"
                  onChange={handleChange}
                  value={form?.employeeMobileNumber}
                />
                <div className="error">
                  {formError.employeeMobileNumber && (
                    <div className="form-eror">
                      {formError.employeeMobileNumber}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-7">
              <button
                type="submit"
                onClick={handleSubmit}
                className={`text-white font-medium py-2  px-10 rounded-md text-14 bg-primary-1200 font-comfortaa  flex items-center gap-3 ${
                  isLoading && 'opacity-50'
                }`}
                disabled={isLoading}
              >
                Submit{' '}
                {isLoading && (
                  <span className="animate-spin text-20">
                    {reactIcons.spinLoader}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UserDetails;
