import { Button as MButton, ButtonProps as MButtonProps } from "@mui/material";
import style from "./Button.module.sass";

type ButtonProps = MButtonProps & {
	bgcolor?: string
}

const Button: React.FC <ButtonProps> = ({ children, className, bgcolor, ...props }) => {

	const buttonSx = {
		"&:hover" : {
			backgroundColor: bgcolor,
			transition: 'all 0.3s ease',
			opacity: '0.8'
		},
		bgcolor: bgcolor,
	}

	return (
		<MButton sx={buttonSx} variant="contained" className={className}>
			{children}
		</MButton>
	)
}

//{bgcolor: 'black', color: 'white', }

export default Button;