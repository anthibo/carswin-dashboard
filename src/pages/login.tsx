import { NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import {
  Button, Col, Container, Form, InputGroup, Row,
} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form"
import { User, UserType } from '@models/user'
import { useSession, signIn } from 'next-auth/react'

type AuthForm = {
  email: string
  password: string
}

const Login: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [authSession, setAuthSession] = useState(session)

  useEffect(() => {
    setAuthSession(session)
  }, [session])

  //TODO: refactor to auth guard
  useEffect(() => {
    const user = authSession?.user as User
    if (user) {
      router.push(getRedirect(user.type))
    }
  }, [authSession])

  const getRedirect = (type: UserType) => {
    switch (type) {
      case UserType.SUPERADMIN:
        return '/admin'
      case UserType.VENDOR:
        return '/vendor'
    }
  }

  const onSubmit: SubmitHandler<AuthForm> = async (data) => {
    console.log(data)
    const { email, password } = data

    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
  }

  // TODO: add error handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>()


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={8}>
            <Row>
              <Col md={7} className="bg-white border p-5">
                <div className="">
                  <h1>Login</h1>
                  <p className="text-black-50">Sign In to your account</p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={faUser}
                          fixedWidth
                        />
                      </InputGroup.Text>
                      <Form.Control
                        {...register("email", { required: true })}
                        placeholder="email"
                        aria-label="Email"
                        type='email'
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={faLock}
                          fixedWidth
                        />
                      </InputGroup.Text>
                      <Form.Control
                        {...register("password", { required: true })}
                        placeholder="Password"
                        type='password'
                        aria-label="Password"
                      />
                    </InputGroup>

                    <Row>
                      <Col xs={6}>
                        <Button className="px-4" variant="primary" type="submit" >Login</Button>
                      </Col>
                      <Col xs={6} className="text-end">
                        <Button className="px-0" variant="link" type="submit">
                          Forgot
                          password?
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
              <Col
                md={5}
                className="bg-primary text-white d-flex align-items-center justify-content-center p-5"
              >
                <div className="text-center">
                  <p>
                    Welcome to Cars Win Dashboard 🚘
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}


export default Login
